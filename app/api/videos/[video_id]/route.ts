import { NextRequest, NextResponse } from "next/server";
import { VideoService } from "@/server/services/video.service";

export const dynamic = "force-dynamic"; // always fresh

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ video_id: string }> },
) {
  const urlParams = await params;
  const item = await VideoService.getVideo(urlParams.video_id);
  return NextResponse.json(item, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
  });
}