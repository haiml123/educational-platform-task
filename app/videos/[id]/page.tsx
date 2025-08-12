import VideoPageContainer from "@/components/video/VideoPageContainer";
import { getVideo } from "@/lib/actions/video.api";
import AppHeader from "@/components/AppHeader";

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  try {
    const video = await getVideo(id);
    if (!video) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Video Not Found
            </h1>
            <p className="text-gray-600">
              The video you&#39;re looking for doesn&#39;t exist.
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        <AppHeader />
        <VideoPageContainer video={video} />
      </>
    );
  } catch (error) {
    console.error("Error fetching video:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Video
          </h1>
          <p className="text-gray-600">
            Something went wrong while loading the video.
          </p>
        </div>
      </div>
    );
  }
}
