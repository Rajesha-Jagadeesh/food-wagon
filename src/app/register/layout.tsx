import type { Metadata } from "next";
import "./../globals.css"
import Navigation from "../Components/Navigation";
export const metadata: Metadata = {
  title: "Register Page",
  description: "Register page for the admins to get registerd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
