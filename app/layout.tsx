import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/navbar";
import Comment from "@/components/comment";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Wild Chicken University",
    template: "%s | Wild Chicken University",
  },
  description: "Possible things made impossible",
  keywords: [
    "wcu",
    "wild chicken university",
    "Wild Chicken",
    "野鸡大学",
    "野雞大學",
    "威尔德切肯大学",
    "万尔德齐肯大学官网",
  ],
  openGraph: {
    title: "Wild Chicken University",
    description: "Possible things made impossible",
    url: "https://wcu.edu.pl",
    images: [
      {
        url: "https://wcu.edu.pl/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Wild Chicken University",
        type: "image/png",
      },
    ],
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
            <main className="grow">
              <Navbar />
              {children}
              <Comment />
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
