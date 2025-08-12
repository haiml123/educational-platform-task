"use client";
import VideoPlayer from "@/components/video/VideoPlayer";
import VideoDetails from "@/components/video/VideoDetails";
import Comments from "@/components/comments/Comments";
import { Video } from "@/schemas/video.types";

interface VideoPageContainerProps {
  video: Video;
}

export default function VideoPageContainer({ video }: VideoPageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <VideoPlayer src={video.video_url} />
            </div>
            <VideoDetails video={video} />
          </div>
          <div className="lg:col-span-1">
            <Comments videoId={video.id} comments={video?.comments || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
