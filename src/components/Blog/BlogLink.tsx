type BlogLinkProps = {
  title?: string;
  link: string;
  linkName: string;
};

const BlogLink = ({ title, link, linkName }: BlogLinkProps) => (
  <>
    <div className="text-slate-400 mb-2 text-base leading-relaxed! sm:text-md md:text-lg">
        {title && (
            <span>{title}</span>
        )}
        <a
            href={link}
            download
            style={{textDecoration: "underline", cursor: "pointer" }}
        >
            {linkName}
        </a>
    </div>
  </>
);

export default BlogLink;
