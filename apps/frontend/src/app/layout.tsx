import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import OfflineBanner from "@/components/common/OfflineBanner";
import { QueryProvider } from "@/lib/provider/query-provider";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' });


export const metadata: Metadata = {
  title: "VedaAI",
  description: "AI Powered Assessment Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolageGrotesque.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
        <OfflineBanner />
      </body>
    </html>
  );
}
