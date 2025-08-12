import { NextResponse } from "next/server";
import { CreateComment } from "@/schemas/comment.types";
import { VideoService } from "@/server/services/video.service";

export async function POST(req: Request) {
  const body: CreateComment = await req.json();
  await VideoService.createComment(body);
  return NextResponse.json({ success: true });
}
