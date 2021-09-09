import styles from "./styles.module.css";
import Card from "./Card";
import { useState } from "react";
import Pagination from "../Pagination/index";
import { UserProps } from "../User/User";

const filteredData = (data: UserProps, num: number) => {
  const start = (num - 1) * 10;
  const end = num * 10;
  return data.slice(start, end);
};

const CardContainer = ({ data }: UserProps): JSX.Element => {
  const [pages, setPages] = useState(1);
  const handleClick = (newPage: number) => setPages(newPage);

  const setToFirst = () => setPages(1);
  const setToLast = () => setPages(50);

  const displayedData = filteredData(data, pages);
  return (
    <>
      <Pagination
        handleClick={handleClick}
        pages={pages}
        setToFirst={setToFirst}
        setToLast={setToLast}
      />
      <article className={styles.container}>
        {displayedData.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
