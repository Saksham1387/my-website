import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingNav } from "@/components/FloatingNav";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Saksham Chaudhary",
  description: "Software engineer, Founding Engineer at Starboard AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/main.png" />
      <body
        className={`${jetbrainsMono.variable} ${instrumentSerif.variable} font-mono antialiased relative pb-20 sm:pb-24`}
      >
        <div className="grain-overlay" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
