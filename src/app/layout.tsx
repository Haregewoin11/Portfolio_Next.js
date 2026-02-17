import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import our new Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure Full-Stack Portfolio",
  description: "Built with Next.js 15 and a security-first mindset.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 antialiased">
        <Navbar />
        {children} {/* Children must have pt-20 to avoid being hidden under navbar */}
      </body>
    </html>
  )
}