"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./LoafHeader.module.css";

export default function LoafHeader() {
  const pathname = usePathname();

  const isRecipesPage = pathname.startsWith("/bread/recipes");
  return (
    <header className={styles.header}>
      <Link href="/bread" className={styles.logo}>
        <img
          src="/images/loafLogo.png"
          alt="Cartoon of a sourdough loaf"
          className={styles.logoImg}
        />
        <span className={styles.logoText}>Loaf.</span>
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/bread"
          className={`${styles.navLink} ${!isRecipesPage ? styles.active : ""}`}
        >
          Ask Loaf
        </Link>

        <Link
          href="/bread/recipes"
          className={`${styles.navLink} ${isRecipesPage ? styles.active : ""}`}
        >
          Recipes
        </Link>
      </nav>{" "}
    </header>
  );
}
