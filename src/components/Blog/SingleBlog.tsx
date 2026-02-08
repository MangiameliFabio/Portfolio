import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, src, paragraph, tags, keyPoints, link } = blog;
  return (
    <>
      <div className="group shadow-one hover:shadow-two bg-dark relative overflow-hidden rounded-xs duration-300">
        <h3 className="border-body-color/20 m-6 border-b">
          <Link
            href={link}
            className="hover:text-primary mb-4 block text-xl font-bold text-black text-white sm:text-2xl"
          >
            {title}
          </Link>
        </h3>
        <div className="border-body-color/20 m-6 flex justify-items-center border-b">
          <div className="mr-9">
            <div className="z-20 mb-6 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
            <ul className="text-body-color mb-6 list-disc space-y-2 pl-5 text-white">
              {keyPoints.map((keyPoint, index) => (
                <li key={index} className="font-medium text-justify">
                  {keyPoint}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6 ml-auto max-w-[50%]">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              height={400}
              className="w-auto rounded-md object-contain mx-5"
            />
          </div>
        </div>
        <div className="mb-6">
          <p className="text-body-color border-body-color/20 mx-6 border-b pb-6 text-white text-justify">
            {paragraph}
          </p>
        </div>
        <div className="mx-6 mb-6 flex items-center">
          <div className="border-body-color/20 flex inline-block items-center border-r px-5">
            <p className="text-body-color text-sm">Organization</p>
            <h4 className="text-dark mb-1 font-medium dark:text-white">
              Chasing Carrots
            </h4>
          </div>
          <div className="border-body-color/20 flex inline-block items-center border-r px-5">
            <p className="text-body-color text-sm">Game</p>
            <h4 className="text-dark mb-1 font-medium dark:text-white">
              Unanounced Titel
            </h4>
          </div>
          <div className="border-body-color/20 flex inline-block items-center border-r px-5">
            <p className="text-body-color text-sm">Date</p>
            <h4 className="text-dark mb-1 font-medium dark:text-white">2025</h4>
          </div>
          <div className="border-body-color/20 flex inline-block items-center border-r px-5">
            <p className="text-body-color text-sm">Duration</p>
            <h4 className="text-dark mb-1 font-medium dark:text-white">
              4 Month
            </h4>
          </div>
          <button className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 flex items-center justify-center rounded-xs px-9 py-4 text-base font-medium text-white duration-300 ml-auto">
            <Link
            href={link}
          >
            Go to Project
          </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
