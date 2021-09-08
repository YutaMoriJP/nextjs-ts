import React from "react";

interface LoggerProps {
  name: string;
}

const Logger = ({ name = "Component" }: LoggerProps) => {
  return <div></div>;
};

export default Logger;
