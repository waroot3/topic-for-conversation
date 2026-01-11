import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";

const shippori = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata = {
  title: "雑談のタネ",
  description: "沈黙が来たら、1ページめくろう。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={shippori.className} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
