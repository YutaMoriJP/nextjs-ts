import styles from "./styles.module.css";

interface CardProps {
  name: string;
  email: string;
  body: string;
}
const Card = ({ name, email, body }: CardProps) => {
  return (
    <article className={styles.item}>
      <h1>
        <strong>TITLE</strong> - {name}
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
