import React, { useEffect, useLayoutEffect } from "react";

interface LoggerProps {
  name: string;
}

const Logger = ({ name = "Component" }: LoggerProps) => {
  useLayoutEffect(() => {
    console.log(`${name} updates are committed to the DOM`);
  }, []);
  useEffect(() => {}, []);
  return <div></div>;
};

export default Logger;
