import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Data } from "./index";
import asyncReq from "./util/asyncReq";
import styles from "./styles.module.css";

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: { params: { id: string } }[];
  fallback: boolean;
}> => {
  const data = await asyncReq();
  const paths: Array<{ params: { id: string } }> = data.map(user => ({
    params: { id: user.id + "" },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<{ props: { data: Data } }> => {
  const {
    params: { id },
  } = context;
  const url = "https://jsonplaceholder.typicode.com/users/";
  const res = await fetch(url + id);
  const data: Data = await res.json();
  return {
    props: { data },
  };
};

const BlogPage = ({ data }) => {
  const router = useRouter();
  console.log(router);
  console.log(data);
  return (
    <article className={styles.listItemContainer}>
      <p>{data.name}</p>
      <p>{data.username}</p>
      <p>{data.email}</p>
    </article>
  );
};

export default BlogPage;
