import type { Metadata } from "next";
import "./../globals.css"
import Navigation from "../Components/Navigation";
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
      <body className={`max-w-[1600px] m-auto w-full h-full`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
