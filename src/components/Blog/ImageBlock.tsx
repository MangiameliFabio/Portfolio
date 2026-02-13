import Image from "next/image";

interface ImageBlockProps {
  src: string;       // image source path
  alt?: string;      // alt text (optional)
  caption: string;   // caption text
  height?: number;   // optional max height
}

const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt = "Image",
  caption,
  height = 400,
}) => (
  <figure className="flex flex-col items-center my-5 md:my-10">
    <div
      className="w-auto rounded-md overflow-hidden"
      style={{ maxHeight: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        style={{ maxHeight: `${height}px`, width: "auto", height: "auto" }}
        className="object-contain"
      />
    </div>
    <figcaption className="mt-2 md:mt-4 text-center text-slate-400 text-sm leading-relaxed! sm:text-base md:text-md italic">
      {caption}
    </figcaption>
  </figure>
);

export default ImageBlock;
