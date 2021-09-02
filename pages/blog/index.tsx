import { useEffect } from "react";
import { GetStaticProps } from "next";

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

const Blog = ({ data }: BlogProps) => {
  useEffect(() => {
    console.log("Blog was mounted");
    return () => {
      console.log("Blog WAS UNMOUNTED");
    };
  }, []);
  return (
    <>
      <ul>
        {data.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
