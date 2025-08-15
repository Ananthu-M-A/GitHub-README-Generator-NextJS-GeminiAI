"use client";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };

export function Button({ className = "", loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`rounded-2xl px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-60 shadow-sm transition ${className}`}
    >
      {loading ? "Working…" : children}
    </button>
  );
}