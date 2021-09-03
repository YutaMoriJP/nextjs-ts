import React from "react";
import { useAuth } from "../../stores/authContext";
import Button from "../Button/Button";
import styles from "./styles.module.css";

const Login = () => {
  const { login, logout, user } = useAuth();
  return (
    <>
      <Button onClick={!user ? login : logout} className={styles.btn}>
        {!user ? "LOGIN" : "LOGOUT"}
      </Button>
    </>
  );
};

export default Login;
