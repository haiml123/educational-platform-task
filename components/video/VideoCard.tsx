import React, { useEffect, useState } from "react";
import { Play, MessageSquare } from "lucide-react";
import { formatDuration } from "@/helpers";
import { Video } from "@/schemas/video.types";
import { getAudioDuration } from "@/app/helpers";

export interface VideoCardProps {
  video: Video;
  onVideoClick?: ((id: string) => void) | undefined;
}

export default function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const [duration, setDuration] = useState(0);

  const handleClick = () => {
    if (onVideoClick && video.id) {
      onVideoClick(video.id);
    }
  };

  useEffect(() => {
    // In real app we will save the duration on the video object.
    getAudioDuration(video.video_url)
        .then((duration: number) => setDuration(duration))
        .catch(() => setDuration(0));
  }, [video.video_url]);

  return (
      <div
          className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full`}
          onClick={handleClick}
      >
        <div className="p-0">
          <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {formatDuration(duration)}
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900">
            {video.title}
          </h3>
          <p className="line-clamp-3 mb-3 text-sm text-gray-600 flex-1">
            {video.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <span>By {video.user_id}</span>
            <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {video.num_comments}
            </span>
            </div>
          </div>
        </div>
      </div>
  );
}