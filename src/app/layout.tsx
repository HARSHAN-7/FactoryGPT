import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "FactoryGPT — AI Intelligence for the Modern Factory",
  description: "AI assistant for manufacturing environments, equipment manuals, SOPs, and operational telemetry data.",
  keywords: ["FactoryGPT", "Industrial AI", "Manufacturing Assistant", "RAG", "Supabase pgvector", "Google Gemini", "SOP Search"],
  authors: [{ name: "FactoryGPT Engineering Team" }],
  openGraph: {
    title: "FactoryGPT — AI Intelligence for the Modern Factory",
    description: "Ask questions, understand factory knowledge, analyze operational data, and access machine intelligence.",
    url: "https://factorygpt.vercel.app",
    siteName: "FactoryGPT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FactoryGPT — AI Intelligence for the Modern Factory",
    description: "Industrial AI assistant powered by Next.js, Supabase pgvector, and Google Gemini.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-industrial-950 text-industrial-100 min-h-screen selection:bg-accent-orange selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
