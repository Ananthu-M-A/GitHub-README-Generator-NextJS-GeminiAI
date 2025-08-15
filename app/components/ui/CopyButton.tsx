"use client";
import { useState } from "react";
import { Button } from "./Button";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch (error) {
          console.error("Failed to copy text: ", error);
          // Optionally, provide user feedback here
        }
      }}
      aria-label="Copy README"
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}