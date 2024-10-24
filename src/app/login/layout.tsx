import type { Metadata } from "next";
import "./../globals.css"
export const metadata: Metadata = {
  title: "Login Page",
  description: "Login page for the customers and admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-[1600px] m-auto w-full h-full`}>{children}</body>
    </html>
  );
}
