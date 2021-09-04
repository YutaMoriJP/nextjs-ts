import { useEffect } from "react";
import { GetStaticProps } from "next";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { asyncReq } from "./util/asyncReq";

//represents object data returned from API
export type Data = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};
//represents object returned by getStaticProps function
interface StaticRes {
  props: {
    data: Data[];
  };
}

//rerepsents props passed to component
export interface BlogProps {
  data: Array<Data>;
}

//data is fetched at build time and props are passed to component as { props: { data } }
export const getStaticProps: GetStaticProps = async (): Promise<StaticRes> => {
  const data = await asyncReq();
  return { props: { data } };
};

const Blog = ({ data }: BlogProps): JSX.Element => {
  const { pathname } = useRouter();

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
            <Link href={`${pathname}/${id}`}>
              <a>{username}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
