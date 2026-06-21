import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeLaHuasteca - Directorio Digital Empresarial",
  description: "Descubre los mejores negocios y servicios de la región Huasteca. Tu directorio digital empresarial con información actualizada de restaurantes, salud, tecnología y más.",
  keywords: ["DeLaHuasteca", "directorio", "Huasteca", "negocios", "Ciudad Valles", "San Luis Potosí", "México", "directorio digital"],
  authors: [{ name: "DeLaHuasteca" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "DeLaHuasteca - Directorio Digital Empresarial",
    description: "Tu directorio digital empresarial de la región Huasteca. Conectamos lo local con el mundo digital.",
    type: "website",
    siteName: "DeLaHuasteca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
