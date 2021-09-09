import React from "react";

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

const Pagination = () => {
  return (
    <div>
      {pageData.map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
