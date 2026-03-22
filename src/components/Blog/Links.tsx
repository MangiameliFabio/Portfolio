import React from "react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const Links = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <>
        <h2
        id={id}
        className="pb-3 mb-3 border-body-color/20 border-b text-lg font-bold leading-tight text-black dark:text-white sm:text-xl sm:leading-tight md:text-2xl md:leading-tight"
        >
            Important Links
        </h2>
        <div className="pb-2 mb-3 border-body-color/20 border-b">
            {children}
        </div>
    </>
  );
};

export default Links;