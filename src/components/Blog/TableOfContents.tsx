"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2, h3")
    );

    const tocItems: TocItem[] = headings
      .filter((heading) => {
        const text = heading.textContent?.trim();
        return (
          heading.id && // must have id
          text &&
          text.toLowerCase() !== "Contents"
        );
      })
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      }));

    setItems(tocItems);
  }, []);

  return (
    <nav className="my-2 md:my-60 table-of-contents">
      <h2 className="md:mb-1 py-1 md:py-2 text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-3xl md:leading-tight">Contents</h2>
      <ul className="space-y-1 md:space-y-2 text-lg">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4 text-base sm:text-md md:text-lg 2xl:text-sm" : "text-md sm:text-lg md:text-xl 2xl:text-base"}
          >
            <a
              href={`#${item.id}`}
              className="hover:underline text-slate-400 leading-tight"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
