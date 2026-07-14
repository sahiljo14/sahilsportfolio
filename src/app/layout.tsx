import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahil | Full Stack Developer",
  description: "Sahil's Developer portfolio website showcasing his projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
