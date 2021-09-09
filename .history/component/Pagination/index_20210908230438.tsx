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
  let start = current - 2; // 5 - 2
  let end = current + 2; //5 + 2
  return Array.from({ length: end - start }, (_, index) => start + index);
};

const Pagination = ({ handleClick, pages }) => {
  let start = pages > 3 ? pages - 3 : 1;
  return (
    <div>
      <Button handleClick={handleClick}>{1}</Button>

      <Button handleClick={handleClick}>{50}</Button>

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
