"use client";

import { useState } from "react";
import LoafHeader from "@/components/LoafHeader/LoafHeader";
import styles from "./page.module.css";

export default function BreadPage() {
  const [isChatActive, setIsChatActive] = useState(false);

  return (
    <main className={styles.page}>
      <LoafHeader />

      {!isChatActive && (
        <section className={styles.welcome}>
          {/* Welcome screen goes here */}
        </section>
      )}

      {isChatActive && (
        <section className={styles.chat}>{/* Chat window goes here */}</section>
      )}
    </main>
  );
}
