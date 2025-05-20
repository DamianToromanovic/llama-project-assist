// app/api/chat/route.ts oder route.js

export async function POST(req) {
  const body = await req.json();

  // Anfrage an Ollama senden
  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral", // Modell ggf. anpassen
      messages: body.messages,
    }),
  });

  // NDJSON (newline-delimited JSON) Zeile für Zeile auslesen und zusammenbauen
  const ollamaText = await ollamaRes.text();

  // Alle Inhalte zusammensetzen
  let answer = "";
  let lastMessage = null;

  // Zeilen einzeln verarbeiten
  for (const line of ollamaText.split("\n")) {
    if (!line.trim()) continue; // Überspringe leere Zeilen
    try {
      const json = JSON.parse(line);
      // Wenn vorhanden, Inhalt anhängen
      if (json.message && json.message.content) {
        answer += json.message.content;
        lastMessage = json.message;
      }
    } catch (e) {
      // Ignoriere fehlerhafte Zeilen (meist am Stream-Ende)
      continue;
    }
  }

  // Rückgabe an das Frontend (nur die finale Antwort)
  return Response.json({
    message: answer || lastMessage?.content || "Keine Antwort erhalten.",
  });
}
