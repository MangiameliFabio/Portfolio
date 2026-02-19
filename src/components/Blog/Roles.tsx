const Roles = ({ roles }: { roles: string[] }) => (
  <div className="my-5 py-2 border-body-color/20 border-t border-b">
    <h2 className="text-xs text-body-color md:text-sm">
      Main Roles</h2>
    <ul className="space-y-1 text-lg">
      {roles.map((item, index) => (
        <li
          key={index}
          className={"text-sm text-black dark:text-white sm:text-md md:text-base"}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Roles;