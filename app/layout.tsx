import ReactQueryProvider from "@/components/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { organization, siteConfig } from "@/lib/utils";
import type { Metadata } from "next";
import { appBodyFont, geistMono } from "../lib/fonts";
import "./globals.css";

const { description, logo, name, url } = siteConfig;
export const metadata: Metadata = {
  title: {
    template: `%s | ${organization}`,
    absolute: `${organization} - ${name}`,
    default: organization,
  },
  description,
  openGraph: {
    url,
    images: [logo],
  },
  applicationName: name,
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
