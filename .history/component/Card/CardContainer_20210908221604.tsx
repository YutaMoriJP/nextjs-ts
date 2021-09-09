import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";

const CardContainer = ({ data }) => {
  const [pages, setPages] = useState(1);
  return (
    <>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>

      <article className={styles.container}>
        {data.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
