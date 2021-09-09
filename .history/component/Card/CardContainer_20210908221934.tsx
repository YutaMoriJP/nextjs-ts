import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";

const Button = ({ children, handleClick }) => {
  return <button onClick={() => handleClick(children)}>{children}</button>;
};

const CardContainer = ({ data }) => {
  const [pages, setPages] = useState(1);
  const handleClick = (newPage: number) => setPages(newPage);
  return (
    <>
      {[
        { children: 1, id: 1 },
        { children: 2, id: 2 },
        { children: 3, id: 3 },
        { children: 4, id: 4 },
        { children: 5, id: 5 },
      ].map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))}
      <article className={styles.container}>
        {data.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
