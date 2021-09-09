import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";

const Button = ({ children }) => {
  return <button>{children}</button>;
};

const CardContainer = ({ data }) => {
  const [pages, setPages] = useState(1);
  return (
    <>
      {[{ children: 1, id: 1 }]}
      <article className={styles.container}>
        {data.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
