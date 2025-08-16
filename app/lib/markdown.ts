import type { GenerateInput } from "@/lib/validation";

function list(items?: string[]) {
  if (!items || items.length === 0) return "";
  return items.map(i => `- ${i}`).join("\n");
}

export function buildBaseMarkdown(input: GenerateInput) {
  const { profile, project } = input;
  const shield = (label: string, message: string, color = "blue") =>
    `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color})`;

  const badges = project.badges
    ? [
      shield("build", "passing", "brightgreen"),
      shield("license", project.license || "MIT", "blue"),
    ].join(" ")
    : "";

  const toc = project.includeToc
    ? `\n## Table of Contents\n- [About](#about)\n- [Features](#features)\n- [Tech Stack](#tech-stack)\n- [Getting Started](#getting-started)\n- [Usage](#usage)\n- [License](#license)\n`
    : "";

  return `# ${project.name}\n\n${project.tagline ? `> ${project.tagline}\n\n` : ""}${badges}\n\n## About\n${project.description}\n\n${toc}\n## Features\n${list(project.features)}\n\n## Tech Stack\n${list(project.tech)}\n\n## Getting Started\n${list(project.install)}\n\n## Usage\n${list(project.usage)}\n\n## License\n${project.license || "MIT"}\n\n---\n\n### Author\n**${profile.devName}**${profile.location ? ` — ${profile.location}` : ""}\n${profile.repoURL ? `\nWebsite: ${profile.repoURL}` : ""}${profile.email ? `\nContact: ${profile.email}` : ""}`;
}