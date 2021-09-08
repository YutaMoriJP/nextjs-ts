import "../styles/globals.css";
import Layout from "../component/Layout/Layout";
import Head from "next/head";
import { useRouter, NextRouter } from "next/router";
import { formatName } from "../util/formatName";
import AuthContextComponent from "../stores/authContext";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { asPath }: NextRouter = useRouter();
  const isHome: boolean = asPath === "/"; //checks if current rendered page is Home
  const [pageName]: string[] = asPath.split("/").slice(-1); //if route is 'blog/user/name', then the current title is name
  const title: string = formatName(isHome ? "home" : pageName); //formats page title from blog to Blog

  console.log("_app is rendered");
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <QueryClientProvider>
        <AuthContextComponent>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextComponent>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
