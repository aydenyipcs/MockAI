import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar";
import Header from "./components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MockAI",
  description: "Take Home Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <div className="flex flex-col max-w-5xl h-screen mx-auto">
          <NavBar />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
