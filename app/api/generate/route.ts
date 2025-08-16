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
        content: `You are an expert technical writer. Improve the provided README in GitHub-flavored Markdown. Keep it concise, clear, and developer-focused. Do not add or invent new features. Preserve existing sections but refine clarity and flow. In "Getting Started", instruct users to copy and configure environment variables from .env.example.In "License", provide detailed license information. In "Author", include my GitHub profile link, portfolio website (https://ananthuma.com), and email. Return only the final markdown, without code fences.`
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