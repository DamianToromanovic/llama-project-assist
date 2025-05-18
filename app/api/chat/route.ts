// app/api/chat/route.ts

export async function POST(req: Request) {
  // Body parsen
  const body = await req.json();

  // Hier später: Weiterleitung an Ollama
  // Jetzt erstmal nur ein Echo
  return Response.json({
    ok: true,
    echo: body,
    info: "Der Bot ist noch nicht angebunden - dies ist ein Test.",
  });
}
