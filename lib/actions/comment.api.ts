"use server";

import { apiGet, apiPost, validateSchema } from "@/helpers";
import { frontendConfig } from "@/app/frontendConfig";
import {
  Comments,
  CommentsSchema,
  CreateComment,
  CreateCommentSchema,
} from "@/schemas/comment.types";
import { revalidatePath } from "next/cache";

export async function createComment(comment: CreateComment, path?: string) {
  const result = validateSchema<CreateComment>(CreateCommentSchema, comment);

  if (!result.success) {
    throw new Error(result.error.message);
  }
  await apiPost<string, CreateComment>(
    `${frontendConfig.host}/api/comments`,
    result.data,
  );

  if (path) {
    revalidatePath(path);
  }
}

export async function getComments(video_id: string): Promise<Comments> {
  if (!video_id) {
    throw new Error("video_id is required");
  }
  const comments = await apiGet<Comments>(
    `${frontendConfig.host}/api/comments/${video_id}`,
  );
  const result = validateSchema(CommentsSchema, comments);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
}
