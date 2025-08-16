import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers";
import AuthButtons from "@/components/AuthButtons";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "README Generator",
  authors: [{ name: "Ananthu M A", url: "https://ananthuma.com" }],
  keywords: ["GitHub", "README", "Generator", "AI", "Markdown"],
  description: "Generate polished GitHub READMEs with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh">
        <Providers>
          <div className="mx-auto max-w-5xl px-4 md:px-6 py-6">
            <header className="mb-6 flex items-center justify-between gap-4">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                GitHub README Generator
              </h1>
              <AuthButtons />
            </header>
            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 w-full max-w-4xl mx-auto">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
