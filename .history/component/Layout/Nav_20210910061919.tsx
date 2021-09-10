import Link from "next/link";
import style from "./style.module.css";
import Login from "../Login/Login";
import Message from "../Message/Message";
import { useAuth } from "../../stores/authContext";

interface NavData {
  path: string;
  name: React.ReactNode;
  id: string | number;
}

interface NavProps {
  data: Array<NavData>;
}

const Nav = ({ data }: NavProps): JSX.Element => {
  const { message, onClose, open, authReady, user } = useAuth();

  return (
    <>
      <nav className={style.nav}>
        <>
          {data.map(
            ({ path, name, id }: NavData, index, thisArg: Array<NavData>) => {
              return (
                <Link href={path} key={id}>
                  <a className={index === thisArg.length - 1 ? style.last : ""}>
                    {name}
                  </a>
                </Link>
              );
            }
          )}
          {authReady && (
            <>
              {user && (
                <p className={style.greeting}>
                  Hi, {user.user_metadata.full_name}
                </p>
              )}
              <Login />
            </>
          )}
        </>
      </nav>
      {open && (
        <Message onClose={onClose} ms={2000}>
          {message}
        </Message>
      )}
    </>
  );
};

export default Nav;
