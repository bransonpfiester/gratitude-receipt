import type { Metadata } from "next";
import { Courier_Prime, Playfair_Display } from "next/font/google";
import "./globals.css";

const courier = Courier_Prime({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-courier",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Gratitude Receipt",
  description: "Daily gratitude journal styled like a CVS receipt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${courier.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
