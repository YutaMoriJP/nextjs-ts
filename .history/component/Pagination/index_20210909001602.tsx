import { useState } from "react";
import style from "./style.module.css";

const Button = ({ children, handleClick, active = false }) => {
  return (
    <button
      className={`${style.button} ${active ? style.active : ""}`}
      onClick={() => handleClick(children)}
    >
      {children}
    </button>
  );
};

const getNums = (current: number) => {
  if (current <= 2) return Array.from({ length: 3 }, (_, index) => 1 + index);
  if (current >= 479 return Array.from({ length: 3 }, (_, index) => 48 + index);

  let start = current - 1; // 5 - 2
  let end = current + 1; //5 + 2

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ handleClick, pages, setToFirst, setToLast }) => {
  const pageCount = (num = pages) =>
    getNums(num).map(num => (
      <Button handleClick={handleClick} active={pages === num} key={num}>
        {num}
      </Button>
    ));

  return (
    <>
      <article className={style.container}>
        <Button handleClick={setToFirst}>{"<<"}</Button>
        {pageCount(pages)}
        <Button handleClick={setToLast}>{">>"}</Button>
      </article>
    </>
  );
};

export default Pagination;
