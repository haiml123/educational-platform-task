import { NextRequest, NextResponse } from "next/server";
import { ScopeLabsApi } from "@/lib/api/scopeLabs.api";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ video_id: string }> },
) {
  try {
    const { video_id } = await params;
    if (!video_id) {
      return NextResponse.json(
          { error: "Video ID is required" },
          { status: 400 },
      );
    }

    const comments = await ScopeLabsApi.getCommentsByVideoId(video_id);

    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 },
    );
  }
}