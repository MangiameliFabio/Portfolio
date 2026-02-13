import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import TagButton from "./TagButton";
import Statistics from "./Statistics";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, src, paragraph, tags, keyPoints, link, orgaType, orgaName, game, date, duration } = blog;
  return (
    <>
      <div className="group shadow-one hover:shadow-two bg-dark relative overflow-hidden rounded-xs duration-300 px-4 md:px-6">
        <h3 className="border-body-color/20 border-b py-3 md:py-6 hover:text-primary text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">
          <Link
            href={link}
          >
            {title}
          </Link>
        </h3>
        <div className="border-body-color/20 flex justify-items-center border-b pb-4 md:pb-6">
          <div className="2xl:mr-9">
            <div className="z-20 pt-3 md:pt-6 flex flex-wrap">
              {tags.map((tag, index) => (
                <TagButton key={index} text={tag}/>
              ))}
            </div>
            <ul className="mt-1 pl-6 text-base leading-relaxed! text-black dark:text-white sm:text-lg md:text-xl list-disc list-outside space-y-2">
              {keyPoints.map((keyPoint, index) => (
                <li key={index}>
                  {keyPoint}
                </li>
              ))}
            </ul>
            <div className="flex 2xl:hidden items-center justify-center mt-5">
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-w-full rounded-md object-contain"
              />
            </div>
          </div>
          <div className="ml-auto max-w-[50%] hidden 2xl:flex items-center justify-center">
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-w-full rounded-md object-contain"
            />
          </div>
        </div>
        <div className="pt-3 md:pt-6 pb-3 md:pb-4 lg:pb-6">
          <p className="text-base leading-relaxed! text-black dark:text-white sm:text-lg md:text-xl">
            {paragraph}
          </p>
        </div>
        <div className="lg:flex">
          <Statistics 
                    stat={{
                      orgaType: orgaType,
                      orgaName: orgaName,
                      game: game,
                      date: date,
                      duration: duration
                    }}/>
        
          <Link
            href={link}
            className="ml-auto cursor-pointer"
          >
            <button className=" mb-4 lg:mb-6 shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 rounded-xs px-9 py-4 text-base leading-relaxed! text-black dark:text-white sm:text-lg md:text-xl duration-300 cursor-pointer w-full mg:w-auto">
              
              Go to Project
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
