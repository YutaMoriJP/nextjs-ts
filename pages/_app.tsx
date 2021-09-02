import "../styles/globals.css";
import Layout from "../component/Layout/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { formatName } from "../util/formatName";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const title = formatName(pathname === "/" ? "home" : pathname.slice(1));
  console.log("_app is rendered");
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
