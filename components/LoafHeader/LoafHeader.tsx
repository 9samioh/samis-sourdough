import styles from "./LoafHeader.module.css";

export default function LoafHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Loaf</span>
      </div>

      <span className={styles.tagline}>A little help with your sourdough</span>
    </header>
  );
}
