import React, { useEffect, useState } from "react";
import { useAuth } from "../../stores/authContext";
import Button from "../Button/Button";
import styles from "./styles.module.css";

const Login = () => {
  //const { onClose, onOpen, open } = useOpen(false);
  const { login, logout, user, loading } = useAuth();

  console.log(`Login rendered`, user);

  const handleClick = () => {
    if (!user) {
      login();
    } else {
      logout();
    }
  };
  useEffect(() => {
    console.log("Login effect runs");
  }, [user]);
  return (
    <>
      <Button onClick={handleClick} className={styles.btn}>
        {loading ? "Loading..." : !user ? "LOGIN" : "LOGOUT"}
      </Button>
    </>
  );
};

export default Login;
