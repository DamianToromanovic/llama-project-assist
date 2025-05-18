"use client";

import React, { useState } from "react";

type Message = { role: "user" | "bot"; content: string };

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hallo! Ich bin Ihr Assistent. Wie kann ich helfen?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // User-Nachricht hinzufügen
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages, // bisherige Konversation
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      // Antwort von Ollama lesen (je nach Modell ggf. data.message.content, siehe JSON-Struktur!)
      const botMessage =
        data.message?.content ||
        data.message ||
        data.messages?.at(-1)?.content || // Falls mehrere messages zurückkommen
        "Bot konnte nicht antworten.";

      setMessages((prev) => [...prev, { role: "bot", content: botMessage }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Fehler beim Antworten vom Bot." },
      ]);
    }
    setInput("");
    setLoading(false);
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
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500">
              Bot schreibt...
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          type="text"
          value={input}
          placeholder="Nachricht eingeben..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSend}
          disabled={loading}
        >
          Senden
        </button>
      </div>
    </div>
  );
}
