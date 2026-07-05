import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, HERO_HEADLINE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: "Judaism 1 | Private Pastoral Guidance for Jews",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: HERO_HEADLINE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
