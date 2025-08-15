"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  return session ? (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-300">{session.user?.name ?? "User"}</span>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  ) : (
    <Button onClick={() => signIn("github")}>Sign in with GitHub</Button>
  );
}