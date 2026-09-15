"use client";
import { useState } from "react";

type UserGateProps = {
  onVerified: (user: { name: string; email: string }) => void;
};

export default function UserGate({ onVerified }: UserGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleVerify = () => {
    if (!email.endsWith("@mcmcg.com")) {
      alert(
        "This is only for my cutie coworkers <3 — please use your work email."
      );
      return;
    }

    const user = { name, email };
    localStorage.setItem("breadUser", JSON.stringify(user));
    onVerified(user);
  };

  return (
    <div className="py-[20%] max-w-sm my-0 mx-auto">
      <p className="mb-4">
        Please enter your full name and work email to continue.
      </p>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        placeholder="Work Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <button
        onClick={handleVerify}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
}
