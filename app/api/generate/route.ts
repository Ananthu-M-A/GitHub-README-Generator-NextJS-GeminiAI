import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { model } from "@/lib/gemini";
import { ratelimit } from "@/lib/rateLimit";
import { GenerateSchema } from "@/lib/validation";
import { buildBaseMarkdown } from "@/lib/markdown";
import { ZodError } from "zod";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const h = headers();
    const ip = (await h).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success } = await ratelimit.limit(`generate:${ip}`);
    if (!success) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), { status: 429 });
    }

    const body = await req.json();
    const parsed = GenerateSchema.parse(body);

    const base = buildBaseMarkdown(parsed);

    const messages = [
      {
        role: "system" as const,
        content:
          "You are an expert technical writer. Polish and enhance the provided README. Keep it GitHub-flavored Markdown, concise, and developer-focused. Avoid inventing features. Maintain sections and improve clarity. Return ONLY the final markdown without code fences.",
      },
      { role: "user" as const, content: `Existing README (may be empty):\n\n${parsed.existing || "(none)"}` },
      { role: "user" as const, content: `Base README to improve:\n\n${base}` },
    ];

    const result = await model.generateContent(messages.map(m => m.content).join("\n"));
    const md = result.response.text()

    const markdown = md && md.length > 0 ? md : base;

    return Response.json({ markdown });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(err?.message || "Unexpected error", { status: 400 });
    }
    console.error("Error in /api/generate:", err);
    return new Response("Unexpected error", { status: 500 });
  }
}