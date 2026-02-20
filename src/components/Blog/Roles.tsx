const Roles = ({ roles }: { roles: string[] }) => (
  <div className="my-5 py-2 border-body-color/20 border-t border-b">
    <h2 className="text-base text-body-color md:text-md">
      Main Roles</h2>
    <ul className="space-y-1 text-lg">
      {roles.map((item, index) => (
        <li
          key={index}
          className={"text-base text-black dark:text-white sm:text-md md:text-lg"}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Roles;