const Button = ({ children, handleClick }) => {
  return <button onClick={() => handleClick(children)}>{children}</button>;
};

const getNums = (current: number) => {
  if (current <= 2) return Array.from({ length: 5 }, (_, index) => 1 + index);
  if (current >= 48) return Array.from({ length: 5 }, (_, index) => 46 + index);

  let start = current - 2; // 5 - 2
  let end = current + 2; //5 + 2

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ handleClick, pages }) => {
  const pageCount = (num = pages) =>
    getNums(num).map(num => <Button handleClick={handleClick}>{num}</Button>);

  return <div>{pageCount(pages)}</div>;
};

export default Pagination;
