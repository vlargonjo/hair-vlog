import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Всё о волосах — HairCare Expert Platform",
  description: "2D примерка причёсок, тест-опросник и персональные рекомендации по уходу"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SupabaseProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="container flex-1 py-10">{children}</main>
              <Footer />
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

