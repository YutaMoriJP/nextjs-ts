import Link from "next/link";
import style from "./style.module.css";
interface NavData {
  path: string;
  name: string;
  id: string | number;
}

interface NavProps {
  data: Array<NavData>;
}

const Nav = ({ data }: NavProps) => {
  return (
    <nav className={style.nav}>
      {data.map(({ path, name, id }: NavData) => (
        <Link href={path} key={id}>
          {name}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;