import type { Metadata } from "next";
import "./../globals.css"
export const metadata: Metadata = {
  title: "Orders",
  description: "The orders page consits of the currently active orders that are added from the billers, online orders and others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
