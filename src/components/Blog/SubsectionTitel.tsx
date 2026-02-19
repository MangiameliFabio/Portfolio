import React from "react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const SubsectionTitel = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <h3
      id={id}
      className="border-body-color/20 mb-2 md:mb-3 py-2 md:py-3 text-lg font-bold leading-tight text-black dark:text-white sm:text-xl sm:leading-tight md:text-2xl md:leading-tight"
    >
      {children}
    </h3>
  );
};

export default SubsectionTitel;