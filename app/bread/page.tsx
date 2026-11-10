"use client";

import { useState } from "react";
import LoafHeader from "@/components/LoafHeader/LoafHeader";
import styles from "./page.module.css";
import WelcomeScreen from "@/components/WelcomeScreen/WelcomeScreen";
import { sendChatMessage, type ChatMessage } from "@/lib/api";
import ChatWindow from "@/components/ChatWindow/ChatWindow";

export default function BreadPage() {
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(message: string) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmedMessage } as ChatMessage,
    ];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(updatedMessages);

      // Add the AI's response to the conversation
      setMessages([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <LoafHeader />

      {!isChatActive && (
        <WelcomeScreen
          onSend={(message) => {
            setIsChatActive(true);
            handleSend(message);
          }}
        />
      )}

      {isChatActive && (
        <section className={styles.chat}>
          <ChatWindow
            messages={messages}
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSend={handleSend}
          />
        </section>
      )}
    </main>
  );
}
