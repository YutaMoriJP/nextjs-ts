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

const Pagination = ({ handleClick, pages }) => {
  let start = pages > 3 ? pages - 3 : 1;
  let end = pages > 3 ? start + 4 : 5;
  return (
    <div>
      Start {start}
      End {end}
      {pageData.map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
