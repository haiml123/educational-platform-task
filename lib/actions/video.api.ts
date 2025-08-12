"use server";

import { apiGet, apiPost, validateSchema } from "@/helpers";
import { frontendConfig } from "@/app/frontendConfig";
import {
  CreateVideo,
  CreateVideoSchema,
  Video,
  Videos,
} from "@/schemas/video.types";
import { revalidatePath } from "next/cache";

export type SearchParams = {
  freeText?: string;
  isRag?: boolean;
};

export async function getVideos({
  freeText = "",
  isRag = false,
}: SearchParams): Promise<{ items: Videos }> {
  const url = `${frontendConfig.host}/api/videos`;
  const res = await apiGet<{ items: Videos }>(url, {
    freeText,
    isRag,
  });
  return res;
}

export async function getVideo(video_id: string): Promise<Video> {
  const url = `${frontendConfig.host}/api/videos/${video_id}`;
  const res = await apiGet<Video>(url);
  return res;
}

export async function createVideo(video: CreateVideo) {
  const result = validateSchema<CreateVideo>(CreateVideoSchema, video);

  if (!result.success) {
    throw new Error(result.error.message);
  }
  await apiPost<string, CreateVideo>(
    `${frontendConfig.host}/api/videos`,
    video,
  );
  revalidatePath("/videos");
}
