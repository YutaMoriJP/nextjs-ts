import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";
import Pagination from "../Pagination/index";

const Button = ({ children, handleClick }) => {
  return <button onClick={() => handleClick(children)}>{children}</button>;
};

const pages = () =>
  Array.from({ length: 50 }, (_, index) => ({
    children: index + 1,
    id: index + 1,
  }));

const pageData = pages();

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
      <Pagination handleClick={handleClick} pages={pages}></Pagination>

      <article className={styles.container}>
        {displayedData.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
