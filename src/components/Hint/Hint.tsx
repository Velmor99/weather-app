import styles from './Hint.module.css';

export const Hint = ({
  content,
  onClick,
}: {
  content: string;
  onClick: (hint: string) => void;
}) => {
  return (
    <div className={styles.hint} onClick={() => onClick(content)}>
      {content}
    </div>
  );
};
