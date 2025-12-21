import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph, tags, keyPoints } = blog;
  return (
    <>
      <div className="group shadow-one hover:shadow-two relative overflow-hidden rounded-xs bg-dark duration-300">
        {/* <Link
          href="/blog-details"
          className="relative block aspect-37/22 w-full"
        >
          <span className="bg-primary absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white capitalize">
            {tags[0]}
          </span>
          <Image src={image} alt="image" fill />
        </Link> */}
        <div className="m-6 flex justify-items-center border-b border-body-color/20">
          <div className="mr-6">
            <h3 className="mb-6 border-b border-body-color/20">
              {/* <Link
                href="/blog-details"
                className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white"
              >
                {title}
              </Link> */}
              <div className="hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl text-white">
                {title}
              </div>
            </h3>
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
            <ul className="text-body-color list-disc space-y-2 pl-5 text-white mb-6">
              {keyPoints.map((keyPoint, index) => (
                <li key={index} className="font-medium">
                  {keyPoint}
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-auto max-w-xl mb-auto ">
            <Image
              src={image}
              alt="image"
              height={400}
              width={800} // any reasonable intrinsic width
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
        <div className="mb-6">
          <p className="mx-6 pb-6 text-body-color text-white border-b border-body-color/20">{paragraph}</p>
        </div>
        <div className=" mx-6 mb-6 flex items-center">
            <div className="border-body-color/20 inline-block px-5 flex items-center border-r">
              <p className="text-body-color text-xs">Organization</p>
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                Chasing Carrots
              </h4>
            </div>
            <div className="border-body-color/20 inline-block px-5 flex items-center border-r">
              <p className="text-body-color text-xs">Game</p>
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                Unanounced Titel
              </h4>
            </div>
            <div className="border-body-color/20 inline-block px-5 flex items-center border-r">
              <p className="text-body-color text-xs">Date</p>
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                2025
              </h4>
            </div>
            <div className="border-body-color/20 inline-block px-5 flex items-center border-r">
              <p className="text-body-color text-xs">Duration</p>
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                4 Month
              </h4>
            </div>
          </div>
      </div>
    </>
  );
};

export default SingleBlog;
