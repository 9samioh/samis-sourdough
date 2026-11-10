"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/api";
import styles from "./ChatWindow.module.css";

type ChatWindowProps = {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: (message: string) => void;
};

export default function ChatWindow({
  messages,
  input,
  isLoading,
  onInputChange,
  onSend,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message whenever the conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    onSend(input);
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? styles.userMessage
                : styles.assistantMessage
            }
          >
            <p>{message.content}</p>
          </div>
        ))}

        {isLoading && (
          <div className={styles.assistantMessage}>
            <p>Loaf is thinking...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask me anything..."
          aria-label="Ask Loaf a question"
          rows={2}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              if (input.trim() && !isLoading) {
                onSend(input);
              }
            }
          }}
        />

        <button
          type="submit"
          className={styles.sendButton}
          disabled={!input.trim() || isLoading}
        >
          ↑
        </button>
      </form>
    </div>
  );
}
