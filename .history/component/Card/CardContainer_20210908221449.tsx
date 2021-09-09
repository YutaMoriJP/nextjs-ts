import styles from "./styles.module.css";
import Card from "./Card";

const CardContainer = ({ data }) => {
  return (
    <>
      {" "}
      <article className={styles.container}>
        {data.map(props => (
          <Card {...props} key={props.id} />
        ))}
      </article>
    </>
  );
};

export default CardContainer;
