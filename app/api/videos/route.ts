import { NextResponse } from "next/server";
import { CreateVideo, Videos } from "@/schemas/video.types";
import { ServerConfig } from "@/server/serverConfig";
import { VideoService } from "@/server/services/video.service";

export const dynamic = "force-dynamic"; // always fresh

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let items: Videos = [];
  const user_id = searchParams.get("user_id") ?? ServerConfig.defaultUserId;
  const freeText = (searchParams.get("freeText") ?? "").trim().toLowerCase();
  const isRag = searchParams.get("isRag") === "true";

  // In case rag mode is off, we fetch all videos from scopeLabs api. In real app we will do pagination based on cursor for better performance and scalability.
  if (user_id && (!isRag || !freeText)) {
    items = await VideoService.getVideos(user_id);
    if (freeText) {
      items = items.filter((v) => v.title.toLowerCase().includes(freeText))
    }
  } else if (freeText) {
    console.log("similarity search ....", freeText);
    items = await VideoService.similaritySearch(freeText);
  }

  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body: CreateVideo = await req.json();
  // TODO: remove init to separate script.
  await VideoService.init();
  await VideoService.createVideo({
    ...body,
    user_id: ServerConfig.defaultUserId!,
  });
  return NextResponse.json({ success: true });
}
