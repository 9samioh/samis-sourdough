import styles from "./LoafHeader.module.css";

export default function LoafHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="/images/loafLogo.png"
          alt="Cartoon of a sourdough loaf"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>Loaf.</span>
      </div>

      <span className={styles.tagline}>A little help with your sourdough</span>
    </header>
  );
}
