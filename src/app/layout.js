import Logo from "./icons/Logo.js"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "./components/menu/Menu"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "create",
  description: "portfolio of aym",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="logo">
          <Logo color="var(--foreground)" />
        </div>
        {children}
        
        <Menu />
      </body>
    </html>
  );
}
