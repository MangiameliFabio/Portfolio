import React from "react";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <h2
      id={id}
      className="border-body-color/20 border-b mb-4 md:mb-6 py-4 md:py-6 text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight"
    >
      {children}
    </h2>
  );
};

export default SectionTitle;