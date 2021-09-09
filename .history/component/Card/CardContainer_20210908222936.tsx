import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";

const Button = ({ children, handleClick }) => {
  return <button onClick={() => handleClick(children)}>{children}</button>;
};

const pages = () =>
  Array.from({ length: 50 }, (_, index) => ({
    children: index + 1,
    id: index + 1,
  }));

const filteredData = (data: any[], num: number) => {
  const start = (num - 1) * 10;
  const end = num * 10;
  return data.slice(start, end);
};
const CardContainer = ({ data }) => {
  const [pages, setPages] = useState(1);
  const handleClick = (newPage: number) => setPages(newPage);
  const displayedData = filteredData(data, pages);
  console.log(displayedData);
  return (
    <>
      {[
        { children: 1, id: 1 },
        { children: 2, id: 2 },
        { children: 3, id: 3 },
        { children: 4, id: 4 },
        { children: 5, id: 5 },
        { children: 6, id: 6 },
        { children: 7, id: 7 },
        { children: 8, id: 8 },
        { children: 9, id: 9 },
        { children: 10, id: 10 },
        { children: 11, id: 11 },
        { children: 12, id: 12 },
        { children: 13, id: 13 },
        { children: 14, id: 14 },
        { children: 15, id: 15 },
      ].map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))}
      <article className={styles.container}>
        {displayedData.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
