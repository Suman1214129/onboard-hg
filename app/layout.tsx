import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "material-symbols";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "HomeGuru - Onboarding",
  description: "1-on-1 tutoring for every subject, every level, every goal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
