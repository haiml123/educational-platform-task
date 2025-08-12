import { apiGet, apiPost } from "@/helpers";
import { Comments, CreateComment } from "@/schemas/comment.types";
import { CreateVideo, Video, Videos } from "@/schemas/video.types";
import { ServerConfig } from "@/server/serverConfig";

export class ScopeLabsApi {
  static apiUrl = ServerConfig.scopeLabsEndpoint;

  static async createVideo(video: CreateVideo): Promise<Video | null> {
    await apiPost<string, CreateVideo>(`${this.apiUrl}/videos`, video);
    const videos: Videos = await this.getVideos(video.user_id!);
    const newVideo = videos.find((v) => v.video_url === video.video_url);
    return newVideo || null;
  }

  static async getVideos(userId: string): Promise<Videos> {
    const response = await apiGet<{ videos: Videos }>(`${this.apiUrl}/videos`, {
      user_id: userId,
    });
    return response?.videos;
  }

  static async getVideo(video_id: string): Promise<Video> {
    const response = await apiGet<{ video: Video }>(
      `${this.apiUrl}/videos/single`,
      {
        video_id,
      },
    );
    return response?.video;
  }

  static async commentVideo(
    comment: CreateComment,
  ): Promise<{ success?: string }> {
    return apiPost<{ success?: string }, unknown>(
      `${this.apiUrl}/videos/comments`,
      comment,
    );
  }

  static async getCommentsByVideoId(videoId: string): Promise<Comments> {
    const resp = await apiGet<{ comments: Comments }>(
      `${this.apiUrl}/videos/comments`,
      {
        video_id: videoId,
      },
    );
    return resp.comments;
  }
}
