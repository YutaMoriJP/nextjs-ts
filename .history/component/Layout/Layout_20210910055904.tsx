import style from "./style.module.css";
import Nav from "./Nav";
import { useEffect } from "react";
import { BiHome, BiWinkSmile } from "react-icons/bi";

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
          { name: <BiHome className={style.icon} />, path: "/", id: 0 },
          {
            name: <BiWinkSmile className={style.icon} />,
            path: "/users",
            id: 1,
          },
        ]}
      />
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
