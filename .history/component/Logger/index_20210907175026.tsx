import React, { useEffect, useLayoutEffect } from "react";

interface LoggerProps {
  name: string;
}

const Logger = ({ name = "Component" }: LoggerProps) => {
  useLayoutEffect(() => {
    console.log(
      `%c ${name} useLayoutEffect runs and updates are committed to the DOM`,
      "color: seagreen"
    );
  }, []);
  useEffect(() => {
    console.log(
      `${name} useEffect runs after component renders and updates are committed to the DOM`
    );
  }, []);
  return <div></div>;
};

export default Logger;
