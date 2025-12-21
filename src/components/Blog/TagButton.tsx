const TagButton = ({ href = "#0", text }: { href?: string; text: string }) => {
  return (
    <a
      //hover:bg-[#2C303B] hover:text-white
      // href={href}
      className="bg-primary rounded-full mb-3 mr-2 inline-flex items-center justify-center px-4 py-2 text-sm text-white duration-300"
    >
      {text}
    </a>
  );
};

export default TagButton;
