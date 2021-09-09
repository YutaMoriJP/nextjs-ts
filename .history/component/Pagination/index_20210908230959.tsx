const Button = ({ children, handleClick }) => {
  return <button onClick={() => handleClick(children)}>{children}</button>;
};

const pages = () =>
  Array.from({ length: 50 }, (_, index) => ({
    children: index + 1,
    id: index + 1,
  }));

const pageData = pages();

const getNums = (current: number) => {
  if (current <= 2) return 2;
  let start = current - 2; // 5 - 2
  let end = current + 2; //5 + 2
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({ handleClick, pages }) => {
  const pageCount = () =>
    getNums(pages).map(num => <Button handleClick={handleClick}>{num}</Button>);
  return (
    <div>
      {pageCount()}
      <hr />
      {/* {pageData.map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))} */}
    </div>
  );
};

export default Pagination;
