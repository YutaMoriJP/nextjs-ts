import { useEffect } from "react";
import { GetStaticProps } from "next";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import asyncReq from "./util/asyncReq";

export type Data = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export interface BlogProps {
  data: Array<Data>;
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { data: Data[] };
}> => {
  const data = await asyncReq();
  return { props: { data } };
};

const Blog = ({ data }: BlogProps): JSX.Element => {
  const router = useRouter();
  console.log(router);

  useEffect((): (() => void) => {
    console.log("Blog was mounted");
    return (): void => {
      console.log("Blog WAS UNMOUNTED");
    };
  }, []);
  return (
    <>
      <ul className={styles.listContainer}>
        {data.map(({ username, id }) => (
          <li key={id} className={styles.listItemContainer}>
            <Link href={`${router.pathname}/${id}`}>
              <a>{username}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
