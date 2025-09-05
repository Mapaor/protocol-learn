import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Protocol Learn - Master Network Protocols & APIs",
  description: "Interactive learning platform for network protocols, APIs, and communication technologies. Learn HTTP, HTTPS, FTP, SSH, and more with practical examples and diagrams.",
  keywords: "protocols, networking, HTTP, HTTPS, FTP, SSH, APIs, REST, learning, tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 overflow-auto">
            <div className="min-h-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
