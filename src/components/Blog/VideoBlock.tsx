"use client";

import { useEffect, useRef } from "react";

interface VideoBlockProps {
  src: string;
  poster?: string;      // optional poster image
  caption?: string;     // optional caption
  height?: number;      // optional max height
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  volume?: number;      // optional volume (0 to 1)
  startTime?: number;
}

const VideoBlock: React.FC<VideoBlockProps> = ({
  src,
  poster,
  caption,
  height = 400,
  autoPlay = true,
  muted = true,
  controls = false,
  loop = true,
  volume = 0.2,
  startTime = 0
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const handleLoadedMetadata = () => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  };

  return (
    <figure className="flex flex-col items-center my-5 md:my-10 p-1">
      <div
        className="w-auto rounded-md overflow-hidden"
        style={{ maxHeight: `${height}px` }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          style={{ maxHeight: `${height}px`, width: "auto", height: "auto" }}
          className="object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 md:mt-4 text-center text-slate-400 text-sm leading-relaxed! sm:text-base md:text-md italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default VideoBlock;
