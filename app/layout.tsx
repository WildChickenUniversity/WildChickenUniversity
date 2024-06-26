import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Provider from "./components/provider";
import Comment from "./components/comment";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wild Chicken University",
  description: "Possible things made impossible",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          {children}
          <Comment />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
