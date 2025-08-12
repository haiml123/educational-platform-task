"use client";

import { Videos } from "@/schemas/video.types";
import VideoList from '@/components/video/VideoList';

export default function VideosPageContainer({ videos }: { videos: Videos }) {
  return (
    <div className="container mx-auto px-4 space-y-6">
      <VideoList videos={videos} />
    </div>
  );
}
