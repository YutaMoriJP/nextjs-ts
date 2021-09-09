import React from "react";

const Pagination = () => {
  return (
    <div>
      {" "}
      {pageData.map(count => (
        <Button key={count.id} handleClick={handleClick}>
          {count.children}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
