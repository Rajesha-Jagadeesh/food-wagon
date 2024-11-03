import type { Metadata } from "next";
import "./../globals.css"
import Navigation from "../Components/Navigation";
export const metadata: Metadata = {
  title: "Forgot password",
  description: "forgot password page is used to recover the account by verifing via email",
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
