import style from "./style.module.css";
import Nav from "./Nav";
import { useEffect } from "react";
import { BiHome, BiUser } from "react-icons/bi";

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
          {
            name: <BiHome className={style.icon}>HOME</BiHome>,
            path: "/",
            id: 0,
          },
          {
            name: <BiUser className={style.icon}>USER</BiUser>,
            path: "/users",
            id: 1,
          },
          {
            name: <article className={style.icon}>HI</article>,
            path: "/",
            id: 0,
          },
        ]}
      />
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
