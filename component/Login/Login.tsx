import React from "react";
import { useAuth } from "../../stores/authContext";
import Button from "../Button/Button";
import styles from "./styles.module.css";

const Login = () => {
  const { login, logout, user, loading } = useAuth();
  console.log(`Login rendered`, user);
  return (
    <>
      <Button onClick={!user ? login : logout} className={styles.btn}>
        {loading ? "Loading..." : !user ? "LOGIN" : "LOGOUT"}
      </Button>
    </>
  );
};

export default Login;
