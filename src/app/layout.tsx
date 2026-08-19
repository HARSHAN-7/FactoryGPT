import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-industrial-950 text-industrial-100 min-h-screen selection:bg-gold-600 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
