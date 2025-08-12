// server/services/qdrant.service.ts
import { QdrantClient } from "@qdrant/js-client-rest";
import { ServerConfig } from "@/server/serverConfig";

type Id = string | number;
export type PointVector = number[] | Record<string, number[]>;

export type QPoint<T extends Record<string, unknown> | null> = {
  id: Id;
  vector: PointVector;
  payload?: T;
};

export type Dist = "Cosine" | "Dot" | "Euclid";
export type NamedVectorsSpec = {
  [name: string]: { size: number; distance: Dist };
};
export type SingleVectorSpec = { size: number; distance: Dist };

export class QdrantService {
  private static _instance: QdrantService;
  private client: QdrantClient;

  private constructor() {
    const url = ServerConfig.qdrant.url;
    const apiKey = ServerConfig.qdrant.key;
    if (!url) throw new Error("Missing QDRANT_URL");
    if (!apiKey) throw new Error("Missing QDRANT_API_KEY");
    this.client = new QdrantClient({ url, apiKey });
  }

  static getInstance(): QdrantService {
    if (!this._instance) {
      this._instance = new QdrantService();
    }
    return this._instance;
  }

  async ensureCollection(
    collection: string,
    vectors: NamedVectorsSpec | SingleVectorSpec,
  ) {
    const exists = (await this.client.getCollections()).collections?.some(
      (c) => c.name === collection,
    );
    if (!exists) {
      await this.client.createCollection(collection, { vectors });
    }
  }

  async ensurePayloadIndex(
    collection: string,
    field: string,
    schema: "keyword" | "integer" | "float" | "text" = "keyword",
  ) {
    await this.client.createPayloadIndex(collection, {
      field_name: field,
      field_schema: schema,
    });
  }

  async upsert<T extends Record<string, unknown>>(
    collection: string,
    points: QPoint<T>[],
  ) {
    if (!points.length) return;
    await this.client.upsert(collection, { points });
  }

  async query<T extends Record<string, unknown>>(
    collection: string,
    args: {
      prefetch: Array<{
        using?: string;
        vector: number[];
        limit?: number;
        filter?: Record<string, unknown>;
      }>;
      filter?: Record<string, unknown>;
      limit?: number;
    },
  ): Promise<({ id: string | number; score: number } & T)[]> {
    const { points } = await this.client.query(collection, {
      prefetch: args.prefetch.map((p) => ({
        ...(p.using ? { using: p.using } : {}),
        query: p.vector,
        ...(p.limit ? { limit: p.limit } : {}),
        ...(p.filter ? { filter: p.filter } : {}),
      })),
      query: { fusion: "rrf" },
      limit: args.limit ?? 20,
      with_payload: true,
      with_vector: false,
      ...(args.filter ? { filter: args.filter } : {}),
    });

    return points.map((p) => ({
      id: p.id,
      score: p.score,
      ...(p.payload as T),
    }));
  }

  async getPointById<T>(
    id: string | number,
    collection: string,
  ): Promise<
    | ({
        id: string | number;
        vector?: Record<string, number[]>;
        payload: T;
      } & T)
    | null
  > {
    try {
      const result = await this.client.retrieve(collection, {
        ids: [id],
        with_payload: true,
        with_vector: true,
      });

      if (result.length === 0) return null;

      const point = result[0];
      return {
        id: point.id,
        ...(point.payload as T),
        payload: point.payload as T,
        vector: point.vector as Record<string, number[]>,
      };
    } catch (err: unknown) {
      console.error(
        `[QdrantService] Failed to retrieve point ${id} from ${collection}`,
        err,
      );
      throw err;
    }
  }

  async updatePayload(
    collection: string,
    id: string,
    payload: Record<string, unknown>,
  ) {
    const point = await this.getPointById(id, collection);
    await this.client.setPayload(collection, {
      points: [id],
      payload: { ...(point?.payload as Record<string, unknown>), ...payload },
    });
  }
}
