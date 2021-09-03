import React from "react";
import { useAuth } from "../../stores/authContext";
import Button from "../Button/Button";
import styles from "./styles.module.css";

interface LoginProps {
  children: string;
}

const Login = ({ children }: LoginProps) => {
  const { login } = useAuth();
  return (
    <>
      <Button onClick={login} className={styles.btn}>
        {children}
      </Button>
    </>
  );
};

export default Login;
