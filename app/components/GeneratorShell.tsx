"use client";
import { useState } from "react";
import { GenerateSchema, type GenerateInput } from "@/lib/validation";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";
import { ZodError } from "zod";

export default function GeneratorShell() {
  const [form, setForm] = useState<GenerateInput>({
    profile: {
      devName: "Ananthu M A",
      location: "Kozhikode",
      repoURL: "",
      email: "ananthumapookkad@gmail.com",
    },
    project: {
      name: "",
      tagline: "",
      description: "",
      features: [],
      tech: [],
      ideas: [],
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
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.message);
      } else {
        setError("Unexpected error");
      }
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
