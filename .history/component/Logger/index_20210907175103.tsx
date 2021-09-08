import React, { useEffect, useLayoutEffect } from "react";

interface LoggerProps {
  name: string;
}

const Logger = ({ name = "Component" }: LoggerProps) => {
  useLayoutEffect(() => {
    console.log(
      `%c ${name} useLayoutEffect runs and updates are committed to the DOM`,
      "color: seagreen; font size: 20px; font-weight: 900"
    );
  }, []);
  useEffect(() => {
    console.log(
      `%c ${name} useEffect runs after component renders and updates are committed to the DOM`,
      "color: seagreen; font size: 20px; font-weight: 900"
    );
  }, []);
  return <div></div>;
};

export default Logger;
