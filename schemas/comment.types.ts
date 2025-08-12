import { z } from "zod";

export const CreateCommentSchema = z.object({
  video_id: z.string(),
  content: z.string(),
  user_id: z.string(),
});

export const CommentSchema = CreateCommentSchema.extend({
  id: z.string(),
  created_at: z.string(),
});

export const CommentsSchema = z.array(CommentSchema);

export type Comments = z.infer<typeof CommentsSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type Comment = z.infer<typeof CommentSchema>;
