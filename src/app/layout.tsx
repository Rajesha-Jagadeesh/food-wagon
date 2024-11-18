import Navigation from "./Components/Navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <section>
        {children}
        </section>
      </body>
    </html>
  );
}
