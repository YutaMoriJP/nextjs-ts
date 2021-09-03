import { MutableRefObject, useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface MessageProps {
  children: string;
  ms: number;
  onClose: () => void;
}

const Message = ({ children, ms = 1000, onClose }: MessageProps) => {
  const timerID: MutableRefObject<NodeJS.Timeout> =
    useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      onClose();
    }, ms);
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);
  return <article className={styles.message}>{children}</article>;
};

export default Message;
