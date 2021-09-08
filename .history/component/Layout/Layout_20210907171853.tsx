import style from "./style.module.css";
import Nav from "./Nav";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    console.log("Layout was mounted");
    return () => {
      console.log("Layout WAS UNMOUNTED");
    };
  }, []);
  return (
    <div className={style.container}>
      <Nav
        data={[
          { name: "HOME", path: "/", id: 0 },
          { name: "USERS", path: "/users", id: 1 },
          { name: "API", path: "/backend", id: 2 },
        ]}
      />
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
