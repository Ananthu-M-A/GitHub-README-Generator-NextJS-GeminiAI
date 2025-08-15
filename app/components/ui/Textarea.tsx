"use client";
import * as React from "react";

export default function Textarea({ label, rows = 6, ...props }: { label?: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm text-neutral-300">{label}</span>}
      <textarea
        rows={rows}
        {...props}
        className={`w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 ${props.className ?? ""}`}
      />
    </label>
  );
}