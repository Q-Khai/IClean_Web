function checkTypeFile(url?: string): string | null {
  if (!url) return null;

  const ext = url.split(".").pop()?.toLocaleLowerCase();
  if (
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "png" ||
    ext === "gif" ||
    ext === "webp"
  ) {
    return "image";
  }
  if (ext === "mp4" || ext === "ogg" || ext === "webm") {
    return "video";
  }
  if (ext === "mp3" || ext === "wav") {
    return "audio";
  }
  if (
    url.includes("https://www.youtube.com") ||
    url.includes("https://youtu.be/")
  ) {
    return "youtube";
  }
  return "file";
}

export default checkTypeFile;
