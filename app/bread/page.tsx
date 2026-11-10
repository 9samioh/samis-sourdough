"use client";

import { useState } from "react";
import LoafHeader from "@/components/LoafHeader/LoafHeader";
import styles from "./page.module.css";
import WelcomeScreen from "@/components/WelcomeScreen/WelcomeScreen";

export default function BreadPage() {
  const [isChatActive, setIsChatActive] = useState(false);

  return (
    <main className={styles.page}>
      <LoafHeader />

      {!isChatActive && (
        <WelcomeScreen
          onSend={(message) => {
            console.log("Message to send:", message);
          }}
        />
      )}

      {isChatActive && (
        <section className={styles.chat}>{/* Chat window goes here */}</section>
      )}
    </main>
  );
}
