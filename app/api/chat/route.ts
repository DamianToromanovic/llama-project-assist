export async function POST(req: Request) {
  const body = await req.json();

  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "mistral",
      messages: body.messages,
    }),
  });

  const ollamaText = await ollamaRes.text();
  console.log("Ollama Rohantwort:", ollamaText);

  let ollamaData;
  try {
    ollamaData = JSON.parse(ollamaText);
  } catch (e) {
    // Fehler beim Parsen
    console.error("Fehler beim Parsen der Ollama-Antwort:", ollamaText);
    return new Response(
      JSON.stringify({
        error: "Ollama gibt kein JSON zurück",
        details: ollamaText,
      }),
      { status: 500 }
    );
  }

  return Response.json(ollamaData);
}
