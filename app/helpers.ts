export function getAudioDuration(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();

    const cleanup = () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audio.src = "";
      audio.load();
    };

    const onLoadedMetadata = () => {
      const duration = audio.duration;
      cleanup();
      resolve(duration);
    };

    const onError = (error: Event) => {
      cleanup();
      reject(error);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);

    // Set preload to metadata only (doesn't download full file)
    audio.preload = "metadata";
    audio.src = url;
  });
}
