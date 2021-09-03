import { useEffect } from "react";
import { GetStaticProps } from "next";
import styles from "./styles.module.css";

type Data = {
  title: string;
  id: number;
};
interface BlogProps {
  data: Array<Data>;
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { data: Data[] };
}> => {
  return {
    props: {
      data: [
        { title: "First Post", id: 0 },
        { title: "Second Post", id: 1 },
      ],
    },
  };
};

const Blog = ({ data }: BlogProps): JSX.Element => {
  useEffect((): (() => void) => {
    console.log("Blog was mounted");
    return (): void => {
      console.log("Blog WAS UNMOUNTED");
    };
  }, []);
  return (
    <>
      <ul className={styles.listContainer}>
        {data.map(({ title, id }) => (
          <li key={id} className={styles.listItemContainer}>
            {title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
