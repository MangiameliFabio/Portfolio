const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      //hover:bg-[#2C303B] hover:text-white
      // href={href}
      className="bg-primary rounded-full mb-2 md:mb-3 mr-1 mr:mb-2 inline-flex items-center justify-center px-3 md:px-4 py-1 md:py-2  text-sm md:text-lg text-white duration-300"
    >
      {text}
    </a>
  );
};

export default TagButton;
