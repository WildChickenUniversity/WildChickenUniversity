type NavPathProps = {
  path: string;
};

const NavPath = ({ path }: NavPathProps) => {
  return (
    <div className="dark:text-white pb-8">
      /{" "}
      <a href="/" className="underline-animation">
        🐔
      </a>{" "}
      /{" "}
      <a href="#" className="underline-animation">
        {path}
      </a>
    </div>
  );
};

export default NavPath;
