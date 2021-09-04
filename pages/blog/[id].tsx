import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Data } from "./index";
import styles from "./styles.module.css";
import { asyncReq } from "./util/asyncReq";

interface PathsData {
  params: { id: string };
}

interface PathRes {
  paths: PathsData[];
  fallback: boolean;
}

interface StaticRes {
  props: {
    data: Data;
  };
}

export const getStaticPaths: GetStaticPaths = async (): Promise<PathRes> => {
  const data = await asyncReq();
  const paths: PathsData[] = data.map(user => ({
    params: { id: user.id + "" },
  }));
  //the length paths array renders the x amount of pages
  //and passes the element { params: { id } } to the getStaticProps function
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<StaticRes> => {
  //context represents the data returned from getStaticPaths
  //which is { params: { id } }
  const {
    params: { id },
  } = context;
  //make a specific GET request to url + id
  const url = "https://jsonplaceholder.typicode.com/users/";
  const res = await fetch(url + id);
  const data: Data = await res.json();
  //unlie /blog, the props passed to BlogPage is the object fetched from the id obtained by getStaticPaths
  return {
    props: { data },
  };
};

const BlogPage = ({ data }) => {
  const router = useRouter();
  return (
    <article className={styles.listItemContainer}>
      <p>{data.name}</p>
      <p>{data.username}</p>
      <p>{data.email}</p>
    </article>
  );
};

export default BlogPage;
