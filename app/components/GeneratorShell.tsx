"use client";
import { useState } from "react";
import { GenerateSchema, type GenerateInput } from "@/lib/validation";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";

export default function GeneratorShell() {
  const [form, setForm] = useState<GenerateInput>({
    profile: {
      devName: "Ananthu M A",
      location: "Kozhikode",
      repoURL: "https://github.com/Ananthu-M-A/github-readme-generator",
      email: "ananthumapookkad@gmail.com",
      socials: [],
    },
    project: {
      name: "GitHub README Generator",
      tagline: "Just another README generator",
      description: "This is a simple README generator.",
      features: ["README generation", "Markdown support", "AI integration", "Custom templates", "Authentication", "User"],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
      ideas: [""],
      install: ["npm install"],
      usage: ["npm run dev"],
      badges: true,
      includeToc: true,
      license: "MIT",
    },
    existing: "",
  });
  const [markdown, setMarkdown] = useState<string>(
    "# Your README will appear here\n\nStart by filling the form and click Generate."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setError(null);
    const parsed = GenerateSchema.safeParse(form);
    if (!parsed.success) {
      setError(
        parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("\n")
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const data = (await res.json()) as { markdown: string };
      setMarkdown(data.markdown);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      <section className="space-y-4">
        <Editor value={form} onChange={setForm} />
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGenerate}
            loading={loading}
            aria-label="Generate README"
          >
            Generate with AI
          </Button>
          <CopyButton text={markdown} />
        </div>
        {error && (
          <p className="text-sm text-red-400 whitespace-pre-wrap border border-red-900/40 rounded-xl p-3">
            {error}
          </p>
        )}
      </section>
      <section className="min-h-[60vh]">
        <div className="w-full max-w-xl mx-auto md:mx-0">
          <Preview markdown={markdown} />
        </div>
      </section>
    </div>
  );
}
