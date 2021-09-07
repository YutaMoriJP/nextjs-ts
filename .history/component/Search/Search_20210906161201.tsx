import React, { useState } from "react";
import Input from "../Input";

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <>
      <Input type="text" name="name" hasSubmitted={hasSubmitted} />
    </>
  );
};

export default Search;
