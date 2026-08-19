import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { IntroVideoModal } from "@/components/ui/IntroVideoModal";

export const metadata: Metadata = {
  title: "FactoryGPT — AI Intelligence for Smarter Manufacturing",
  description: "Run your factory smarter with AI. FactoryGPT brings the power of AI to your production line. Optimize operations, predict issues, and make data-driven decisions in real-time.",
  keywords: ["FactoryGPT", "Smart Manufacturing", "Industrial AI", "Predictive Maintenance", "Supabase pgvector", "Google Gemini"],
  authors: [{ name: "FactoryGPT Engineering Team" }],
  openGraph: {
    title: "FactoryGPT — AI Intelligence for Smarter Manufacturing",
    description: "Run your factory smarter with AI. Optimize operations, predict issues, and make data-driven decisions in real-time.",
    url: "https://factorygpt.vercel.app",
    siteName: "FactoryGPT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FactoryGPT — AI Intelligence for Smarter Manufacturing",
    description: "Industrial AI platform powered by Next.js, Supabase pgvector, and Google Gemini.",
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
    <html lang="en" suppressHydrationWarning className="light">
      <body className="antialiased bg-white text-slate-900 min-h-screen selection:bg-amber-500 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Intro Video Player on Website Open */}
          <IntroVideoModal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
