import { z } from "zod";
import { CommentsSchema } from "@/schemas/comment.types";

export const CreateVideoSchema = z.object({
  user_id: z.string().optional(),
  description: z.string(),
  video_url: z.string().url(),
  title: z.string(),
});

export const VideoSchema = CreateVideoSchema.extend({
  id: z.string(),
  created_at: z.string(),
  num_comments: z.number(),
  comments: CommentsSchema.optional(),
});

export const VideosArraySchema = z.array(VideoSchema);

export type CreateVideo = z.infer<typeof CreateVideoSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Videos = z.infer<typeof VideosArraySchema>;
