import Link from "next/link";
import style from "./style.module.css";
import Login from "../Login/Login";
import useOpen from "../../useHooks/useOpen";
import React, { useState } from "react";
import Message from "../Message/Message";
import { useAuth } from "../../stores/authContext";

interface NavData {
  path: string;
  name: string;
  id: string | number;
}

interface NavProps {
  data: Array<NavData>;
}

const Nav = ({ data }: NavProps) => {
  const { message, onClose, open, authReady } = useAuth();
  return (
    <>
      <nav className={style.nav}>
        <>
          {data.map(({ path, name, id }: NavData) => (
            <Link href={path} key={id}>
              {name}
            </Link>
          ))}
          {authReady && <Login />}
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
