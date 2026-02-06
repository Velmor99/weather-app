import styles from './UncontrolledTextInput.module.css';

export const UncontrolledTextInput = ({
  onChange,
  ref,
}: {
  onChange: (value: string) => void;
  ref: React.RefObject<HTMLInputElement> | null;
}) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Type your city name in English and select it from the list bellow"
      ref={ref}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
