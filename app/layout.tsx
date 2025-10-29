import localFont from "next/font/local";
import "./globals.css";

const jakartaSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-jakarta-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
