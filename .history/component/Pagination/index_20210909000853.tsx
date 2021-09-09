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
  if (current <= 2) return Array.from({ length: 5 }, (_, index) => 1 + index);
  if (current >= 48) return Array.from({ length: 5 }, (_, index) => 46 + index);

  let start = current - 2; // 5 - 2
  let end = current + 2; //5 + 2

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const getNums2 = (current: number, E: number, S, setEnd, setStart) => {
  if (current <= 2) return Array.from({ length: 5 }, (_, index) => 1 + index);
  if (current >= 48) return Array.from({ length: 5 }, (_, index) => 46 + index);
  if (current + 1 === E) {
    let start = current - 2; // 5 - 2
    let end = current + 2; //5 + 2
    setEnd(end);
    const nums = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    console.log("end", nums);
    return nums;
  }
  if (current - 1 === S) {
    let start = current - 2; // 5 - 2
    let end = current + 2; //5 + 2
    setStart(start);
    const nums = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    console.log("start", nums);
    return nums;
  }
  let start = current - 2; // 5 - 2
  let end = current + 2; //5 + 2
  return Array.from({ length: E - S + 1 }, (_, index) => S + index);
};

const Pagination = ({ handleClick, pages, setToFirst, setToLast }) => {
  const [end, setEnd] = useState(1);
  const [start, setStart] = useState(5);

  const pageCount = (num = pages) =>
    getNums(num).map(num => (
      <Button handleClick={handleClick} active={pages === num} key={num}>
        {num}
      </Button>
    ));

  const pageCount2 = (num = pages) =>
    getNums2(num, end, start, setEnd, setStart).map(num => (
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

      <article className={style.container}>
        <Button handleClick={setToFirst}>{"<<"}</Button>
        {pageCount2(pages)}
        <Button handleClick={setToLast}>{">>"}</Button>
      </article>
    </>
  );
};

export default Pagination;
