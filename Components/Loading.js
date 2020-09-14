import styles from "./loading.module.css";
import { CircularProgress } from "@material-ui/core";

export default function Loading({ message }) {
  return (
    <main className={styles.loading}>
      <CircularProgress size={70} className="styles.circle" color="inherit" />
      {message && <h3>{message}</h3>}
    </main>
  );
}
