// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "WH Solutions - Expert en Hygiène Professionnelle au Maroc",
    template: "%s | WH Solutions",
  },
  description:
    "WH Solutions, votre expert en hygiène professionnelle au Maroc. Produits de nettoyage, désinfection, traitement des eaux conformes HACCP. Livraison partout au Maroc.",
  keywords: [
    "hygiène professionnelle Maroc",
    "produits nettoyage industriel",
    "désinfection HACCP",
    "WH Solutions Kenitra",
  ],
  authors: [{ name: "WH Solutions" }],
  creator: "WH Solutions",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://whsolutions-production.up.railway.app"
  ),
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "WH Solutions",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={poppins.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
