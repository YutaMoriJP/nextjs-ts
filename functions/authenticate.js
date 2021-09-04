const fetch = require("node-fetch");

const asyncReq = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments/");
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

exports.handler = async (event, context) => {
  const data = await asyncReq();
  const isAuthenticated = context.clientContext.user;

  if (isAuthenticated) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "connected successfully",
        data,
        loggedIn: true,
      }),
      isAuthenticated,
      clientContext: context.clientContext,
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({
      msg: "To view the content please log in.",
      logged: false,
      isAuthenticated,
      clientContext: context.clientContext,
    }),
  };
};
