import { Html, Head, Main, NextScript } from "next/document";

const MyDocument = () => {
  console.log("_document is called");
  return (
    <Html lang={"en"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
