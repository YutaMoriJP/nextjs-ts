import { useEffect } from "react";
import { GetStaticProps } from "next";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { asyncReq } from "../../util/asyncReq";
import Search from "../../component/Search";

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

//data prop is passed from getStaticProps
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
      <h1 className={styles.title}>Users</h1>
      <p className={styles.text}>
        Dummy data returned from{" "}
        <code className={styles.code}>
          https://jsonplaceholder.typicode.com/users/
        </code>
      </p>
      <Search></Search>
      <ul className={styles.listContainer}>
        {data.map(({ name, id }) => (
          <Link href={`${pathname}/${id}`} key={id}>
            <li className={styles.listItemContainer}>
              <a>{name}</a>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Blog;
