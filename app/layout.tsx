import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Multi-Tenant Demo",
//   description: "A demo application showcasing multi-tenant functionality",
// };

export const metadata: Metadata = {
  title: "Login - Multi-Tenant Demo",
  description: "Login page for the multi-tenant demo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
