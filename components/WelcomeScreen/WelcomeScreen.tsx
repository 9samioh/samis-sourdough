"use client";

import { useState } from "react";
import styles from "./WelcomeScreen.module.css";

type WelcomeScreenProps = {
  onSend: (message: string) => void;
};

const suggestedPrompts = [
  "How do I start a sourdough starter?",
  "Is my dough done proofing?",
  "Give me a beginner recipe",
  "Help me plan a baking day",
];

export default function WelcomeScreen({ onSend }: WelcomeScreenProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSend(trimmedMessage);
    setMessage("");
  }

  function handlePrompt(prompt: string) {
    onSend(prompt);
  }

  return (
    <section className={styles.welcome}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heading}>
            Sourdough's complicated.
            <br />
            Let’s make it easier
          </h1>

          <p className={styles.description}>
            Your friendly guide to all things sourdough. Ask me anything!
          </p>
        </div>

        <div className={styles.illustration}>
          <img
            src="/images/sourdoughHeroImg.png"
            alt="Image of a sourdough loaf"
          />
        </div>
      </div>

      <div className={styles.interaction}>
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about sourdough..."
            aria-label="Ask Loaf a question"
            rows={2}
          />

          <div className={styles.inputFooter}>
            <span>YOUR BAKING JOURNEY STARTS HERE</span>

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
            >
              ↑
            </button>
          </div>
        </form>

        <div className={styles.suggestions}>
          <span className={styles.suggestionLabel}>
            NOT SURE WHERE TO START?
          </span>

          <div className={styles.promptGrid}>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.prompt}
                onClick={() => handlePrompt(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
