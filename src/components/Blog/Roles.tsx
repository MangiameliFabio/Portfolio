const Roles = ({ roles }: { roles: string[] }) => (
  <div className="my-5 py-4 border-body-color/20 border-t border-b">
    <h2 className="text-sm text-body-color md:text-sm">
      Main Roles
    </h2>
    <p className="text-md">{roles.join(", ")}</p>
  </div>
);

export default Roles;