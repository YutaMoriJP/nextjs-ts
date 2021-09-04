import styles from "./styles.module.css";

interface CardProps {
  name: string;
  email: string;
  body: string;
}
const Card = ({ name, email, body }: CardProps) => {
  return (
    <article className={styles.item}>
      <h1>{name}</h1>
      <p>{email}</p>
      <p>body</p>
    </article>
  );
};

export default Card;
