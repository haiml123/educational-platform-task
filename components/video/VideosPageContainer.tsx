"use client";

import { useEffect, useState } from 'react';
import { getVideos } from "@/lib/actions/video.api";
import VideoList from '@/components/video/VideoList';
import { VideoListSkeleton } from '@/components/video/VideoListSkeleton';
import { Videos } from "@/schemas/video.types";

interface VideosPageContainerProps {
    freeText: string;
    isRag: boolean;
}

export default function VideosPageContainer({
                                                freeText,
                                                isRag
                                            }: VideosPageContainerProps) {
    const [videos, setVideos] = useState<Videos>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const { items } = await getVideos({ freeText, isRag });
                setVideos(items);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [freeText, isRag]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 space-y-6">
                <VideoListSkeleton />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 space-y-6">
            <VideoList videos={videos} />
        </div>
    );
}