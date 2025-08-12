import {
  NamedVectorsSpec,
  QdrantService,
  QPoint,
  SingleVectorSpec,
} from "./qdrant.service";

export class QdrantCollection {
  private service = QdrantService.getInstance();
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  ensureCollection(vectors: NamedVectorsSpec | SingleVectorSpec) {
    return this.service.ensureCollection(this.collection, vectors);
  }

  ensurePayloadIndex(
    field: string,
    schema: "keyword" | "integer" | "float" | "text" = "keyword",
  ) {
    return this.service.ensurePayloadIndex(this.collection, field, schema);
  }

  upsert<T extends Record<string, unknown>>(points: QPoint<T>[]) {
    return this.service.upsert(this.collection, points);
  }

  query<T extends Record<string, unknown>>(args: {
    prefetch: Array<{
      using?: string;
      vector: number[];
      limit?: number;
      filter?: Record<string, unknown>;
    }>;
    filter?: Record<string, unknown>;
    limit?: number;
  }) {
    return this.service.query<T>(this.collection, args);
  }

  async updatePayload(id: string, payload: Record<string, unknown>) {
    await this.service.updatePayload(this.collection, id, payload);
  }
}
