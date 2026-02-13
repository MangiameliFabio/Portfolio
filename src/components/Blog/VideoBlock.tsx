interface VideoBlockProps {
  src: string;
  poster?: string;      // optional poster image
  caption?: string;     // optional caption
  height?: number;      // optional max height
}

const VideoBlock: React.FC<VideoBlockProps> = ({
  src,
  poster,
  caption,
  height = 400,
}) => (
  <figure className="flex flex-col items-center my-5 md:my-10">
    <div
      className="w-auto rounded-md overflow-hidden"
      style={{ maxHeight: `${height}px` }}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
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

export default VideoBlock;
