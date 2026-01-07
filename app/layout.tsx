import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wild Chicken University",
  description: "Possible things made impossible",
  keywords: ["wcu", "wild chicken university", "Wild Chicken", "野鸡大学", "野雞大學"],
  openGraph: {
    title: "Wild Chicken University",
    description: "Possible things made impossible",
    url: "https://wcu.edu.pl",
    images: [{
      url: "https://wcu.edu.pl/images/opengraph.png",
      width: 1200,
      height: 630,
      alt: "Wild Chicken University",
      type: "image/png"
    }]
  },
  metadataBase: new URL("https://wcu.edu.pl"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
