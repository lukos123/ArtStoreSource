import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import store from "@/store/app";
import Body from "@/components/Body/Body";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Welcome",
  description: "...",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Body>{children}</Body>
      </body>
    </html>
  );
}
