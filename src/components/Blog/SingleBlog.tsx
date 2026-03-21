import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import TagButton from "./TagButton";
import Statistics from "./Statistics";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const {
    title,
    src,
    paragraph,
    tags,
    keyPoints,
    link,
    orgaType,
    orgaName,
    game,
    date,
    duration,
    teamSize,
  } = blog;
  const isVideoPreview = /\.(mp4|webm|ogg)$/i.test(src);

  const preview = isVideoPreview ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="h-auto w-full max-w-full rounded-xl object-contain"
    />
  ) : (
    <Image
      src={src}
      alt={title}
      width={1200}
      height={675}
      className="h-auto w-full max-w-full rounded-xl object-contain"
    />
  );

  return (
    <>
      <div className="group shadow-one hover:shadow-two bg-dark relative overflow-hidden rounded-3xl border border-white/10 px-4 duration-300 md:px-6">
        <h3 className="border-body-color/20 hover:text-primary border-b py-3 text-xl leading-tight font-bold text-black sm:text-2xl sm:leading-tight md:py-6 md:text-3xl md:leading-tight dark:text-white">
          <Link href={link}>{title}</Link>
        </h3>
        <div className="border-body-color/20 flex justify-items-center border-b pb-4 md:pb-6">
          <div className="2xl:mr-9">
            <div className="z-20 flex flex-wrap pt-3 md:pt-6">
              {tags.map((tag, index) => (
                <TagButton key={index} text={tag} />
              ))}
            </div>
            <ul className="mt-1 list-outside list-disc space-y-2 pl-6 text-base leading-relaxed! text-black sm:text-lg md:text-xl dark:text-white">
              {keyPoints.map((keyPoint, index) => (
                <li key={index}>{keyPoint}</li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-center 2xl:hidden">
              {preview}
            </div>
          </div>
          <div className="ml-auto hidden max-w-[50%] items-center justify-center 2xl:flex">
            {preview}
          </div>
        </div>
        <div className="pt-3 pb-3 md:pt-6 md:pb-4 lg:pb-6">
          <p className="text-base leading-relaxed! text-black sm:text-lg md:text-xl dark:text-white">
            {paragraph}
          </p>
        </div>
        <div className="mb-4 lg:flex">
          <Statistics
            stat={blog}
          />

          <Link href={link} className="ml-auto cursor-pointer">
            <button className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 sm:text-md mg:w-auto w-full cursor-pointer rounded-lg py-2 text-base leading-relaxed! text-black duration-300 md:px-6 md:text-lg dark:text-white">
              Go to Project
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
