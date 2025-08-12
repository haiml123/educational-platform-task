import { Eye, Clock, User } from "lucide-react";
import { formatDuration } from "@/helpers";
import { Video } from "@/schemas/video.types";
import { useEffect, useState } from "react";
import { getAudioDuration } from "@/app/helpers";

export default function VideoDetails({ video }: { video: Video }) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // In real app we will save the duration on the video object.
    getAudioDuration(video.video_url)
      .then((duration: number) => setDuration(duration))
      .catch(() => setDuration(0));
  }, [video.video_url]);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {video.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {video.user_id}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />4 views
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(duration)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Tech
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
}
