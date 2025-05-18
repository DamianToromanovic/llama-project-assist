// app/api/chat/route.ts

export async function POST(req: Request) {
  // Body parsen
  const body = await req.json();

  //Anfrage an Ollama weiterleiten
  const ollamaRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "command-r-plus",
      messages: body.messages,
    }),
  });

  const ollamaData = await ollamaRes.json();

  return Response.json(ollamaData);
}
