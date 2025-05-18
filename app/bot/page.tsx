"use client";

import React, { useState } from "react";

export default function page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([
    {
      role: "bot",
      content: "Hallo! Ich bin Ihr Assistent. Wie kann ich helfen?",
    },
  ]);

  // Auseinandergebaut:
  // 1 useState<...>
  // Das <...> ist die TypeScript-Generics-Syntax.

  // Hier gibst du an, welchen Datentyp dein State hat.

  // 2 { role: "user" | "bot"; content: string }[]
  // Das ist der Typ, den du speicherst.

  // { ... }[] bedeutet:
  // → Ein Array von Objekten mit zwei Properties:

  // role: entweder "user" oder "bot"

  // content: ein string

  // Du sagst also:
  // "Der State messages ist ein Array von Nachrichten-Objekten, und jedes Nachrichten-Objekt sieht so aus:"

  // 3 useState<T>(initialValue)
  // TypeScript weiß jetzt:
  // Wenn du später messages benutzt, erwartet TS genau dieses Array von Nachrichten.

  // Der Initialwert ([...]) ist ein Array, das schon ein Nachrichten-Objekt enthält.

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">
        Willkommen bei Ihrem persönlichen Assistenten
      </h1>
      <div className="h-80 overflow-y-auto mb-4 bg-gray-50 p-3 rounded-lg border">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          type="text"
          value={input}
          placeholder="Nachricht eingeben..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSend}
        >
          Senden
        </button>
      </div>
    </div>
  );
}
