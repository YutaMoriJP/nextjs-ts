import styles from "./styles.module.css";

interface CardProps {
  name: string;
  email: string;
  body: string;
  id: number;
}
const Card = ({ name, email, body, id }: CardProps) => {
  return (
    <article className={styles.item}>
      <h1>
        <strong>{id} - TITLE</strong> - {name}
      </h1>
      <p>
        <strong>EMAIL</strong> - {email}
      </p>
      <p>
        <strong>COMMENT</strong> - {body}
      </p>
    </article>
  );
};

export default Card;
