import { useAuth } from "../../stores/authContext";
import Button from "../Button/Button";
import styles from "./styles.module.css";

const Login = () => {
  //const { onClose, onOpen, open } = useOpen(false);
  const { login, logout, user, authReady } = useAuth();

  const handleClick = () => {
    if (!user) {
      login();
    } else {
      logout();
    }
  };

  return (
    <>
      <Button onClick={handleClick} className={styles.btn}>
        {!user ? "LOGIN" : "LOGOUT"}
      </Button>
    </>
  );
};

export default Login;
