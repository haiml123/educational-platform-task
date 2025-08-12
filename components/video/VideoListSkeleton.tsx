export function VideoCardSkeleton() {
  return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden relative">
        <div className="animate-pulse">
          {/* Video thumbnail skeleton */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            {/* Duration badge skeleton */}
            <div className="absolute bottom-2 right-2 bg-gray-300 h-6 w-12 rounded"></div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title skeleton - 2 lines */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-4/5"></div>
              <div className="h-5 bg-gray-200 rounded w-3/5"></div>
            </div>

            {/* Description skeleton - 3 lines */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center justify-between pt-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>

        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      </div>
  );
}

export function VideoListSkeleton() {
  return ( <section className="container mx-auto px-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {Array.from({ length: 6 }).map((_, index) => (
              <VideoCardSkeleton key={index} />
          ))}
        </div>
  </section>)
}