import React from "react";
import { Play } from "lucide-react";
import { Videos } from "@/schemas/video.types";
import { useRouter } from "next/navigation";
import VideoCard from '@/components/video/VideoCard';

interface VideoListProps {
  videos?: Videos;
  emptyStateMessage?: string;
  emptyStateAction?: React.ReactNode;
  loading?: boolean;
}

function EmptyState({
  message,
  action,
}: {
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12">
      <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {message || "No videos found"}
      </h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search or be the first to create a video!
      </p>
      {action}
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 animate-pulse">
          <div className="aspect-video bg-muted rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VideoList({
  videos = [],
  emptyStateMessage,
  emptyStateAction,
  loading = false,
}: VideoListProps) {
  const router = useRouter();

  if (loading) {
    return <LoadingState />;
  }

  if (videos.length === 0) {
    return <EmptyState message={emptyStateMessage} action={emptyStateAction} />;
  }

  const onVideoClick = (id: string) => {
    router.push(`/videos/${id}`);
  };

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoClick={onVideoClick} />
      ))}
    </div>
  );
}
