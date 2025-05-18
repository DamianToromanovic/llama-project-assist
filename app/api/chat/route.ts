// app/api/chat/route.ts

export async function POST(req: Request) {
  // Body parsen
  const body = await req.json();

  const ollamaRes = await fetch("http://localhost:11434/ap/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "command-r-plus",
      messages: body.messages,
    }),
  });
}
