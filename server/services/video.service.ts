import { QdrantCollection } from "@/server/services/qdrant.collection";
import { QPoint } from "@/server/services/qdrant.service";
import { getEmbedder, getLLM } from "@/lib/llms/llm.manager";
import { enhanceQueryPrompt } from "@/server/prompts/enhanceQuery.prompt";
import { enhanceQuerySchema } from "@/server/prompts/schemas/enhanceQuery.schema";
import { ScopeLabsApi } from "@/lib/api/scopeLabs.api";
import { CreateVideo, Video } from "@/schemas/video.types";
import { QdrantCollectionName } from "@/server/consts";
import { CreateComment } from "@/schemas/comment.types";

export type EnhancedQuery = {
  title: string;
  description: string;
};

const videoCollection = new QdrantCollection(QdrantCollectionName.Video);

const llm = getLLM();
const embedder = getEmbedder();

export class VideoService {
  static async init() {
    await videoCollection.ensureCollection({
      title: { size: 1536, distance: "Cosine" },
      description: { size: 1536, distance: "Cosine" },
    });
  }
  static async createVideo(video: CreateVideo) {
    const newVideo = await ScopeLabsApi.createVideo(video);
    if (!newVideo) {
      throw new Error("Failed to create video");
    }
    console.log(`Created video ${newVideo.id}`);

    const [titleEmbedding, descriptionEmbedding] = await embedder.embed([
      video.title,
      video.description,
    ]);
    const point: QPoint<Video & { video_id: string }> = {
      id: crypto.randomUUID(),
      vector: {
        title: titleEmbedding,
        description: descriptionEmbedding,
      },
      payload: { ...newVideo, video_id: newVideo.id },
    };
    return videoCollection.upsert<Video>([point]);
  }
  static async getVideo(video_id: string): Promise<Video> {
    const [video, comments] = await Promise.all([
      ScopeLabsApi.getVideo(video_id),
      ScopeLabsApi.getCommentsByVideoId(video_id),
    ]);
    console.log("comments", comments);
    if (!video) {
      throw new Error("Failed to get video");
    }
    return { ...video, comments };
  }
  static async getVideos(user_id: string) {
    const video = await ScopeLabsApi.getVideos(user_id);
    if (!video) {
      throw new Error("Failed to get video");
    }
    return video;
  }

  static async createComment(comment: CreateComment) {
    const response = await ScopeLabsApi.commentVideo(comment);
    if (response?.success) {
      // sync between Qdrant and ScopeLabs DB.
      const currentVideo = await ScopeLabsApi.getCommentsByVideoId(
        comment.video_id,
      );
      await videoCollection.updatePayload(comment.video_id, {
        numberOfComments: currentVideo.length,
      });
    }
  }

  static async getEnhancedQuery(query: string) {
    const content = enhanceQueryPrompt(query);
    return llm.chatMini<EnhancedQuery>({
      messages: [{ role: "user", content }],
      schema: enhanceQuerySchema,
    });
  }

  static async similaritySearch(query: string) {
    const content = await this.getEnhancedQuery(query);
    const [titleEmbedding, descriptionEmbedding] = await embedder.embed([
      content.title,
      content.description,
    ]);
    const points = await videoCollection.query<Video>({
      prefetch: [
        {
          using: "title",
          vector: titleEmbedding,
          limit: 100,
        },
        {
          using: "description",
          vector: descriptionEmbedding,
          limit: 100,
        },
      ],
    });
    console.log("points", points);
    return points.sort((a, b) => b.score - a.score);
  }
}
