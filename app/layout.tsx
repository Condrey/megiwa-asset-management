import ReactQueryProvider from "@/components/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { appBodyFont, geistMono } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Ocira James Estates",
    absolute: "Ocira James Estates",
  },
  description:
    "Official site to manage properties of our Father Mr. James Ocira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${appBodyFont.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ReactQueryProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
