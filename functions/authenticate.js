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
  const { identity, user } = context.clientContext;

  if (user) {
    return {
      user,
      clientContext: context.clientContext,
      statusCode: 200,
      body: JSON.stringify({
        msg: "connected successfully",
        data,
        loggedIn: true,
      }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({
      msg: "To view the content please log in.",
      logged: false,
      user,
      clientContext: context.clientContext,
      identity,
    }),
  };
};
