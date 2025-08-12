import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import AppHeader from "@/components/AppHeader";
import { getVideos } from "@/lib/actions/video.api";
import VideosPageContainer from "@/components/video/VideosPageContainer";
import { VideoListSkeleton } from '@/components/video/VideoListSkeleton';

export const dynamic = "force-dynamic";

export default async function VideoPage({
  searchParams,
}: {
  searchParams?: Promise<{ freeText?: string; isRag?: string }>;
}) {
  const params = await searchParams;

  const freeText = (params?.freeText ?? "").trim().toLowerCase();
  const isRag = params?.isRag === "true";
  const { items } = await getVideos({ freeText, isRag });

  return (
    <>
      <AppHeader />
      <main className="mx-auto p-6 space-y-6">
        <SearchBar placeholder="Search for videos" />
        <Suspense fallback={<VideoListSkeleton />}>
          <VideosPageContainer videos={items} />
        </Suspense>
      </main>
    </>
  );
}
