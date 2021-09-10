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
            name: (
              <section className={style.section}>
                <BiHome className={style.icon} />
                <p>HOME</p>
              </section>
            ),
            path: "/",
            id: 0,
          },
          {
            name: (
              <section className={style.section}>
                <BiUser className={style.icon} />
              </section>
            ),
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
