import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { BottomNav, Sidebar } from "./components/SwitchingNavbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Debt Tracker",
  description: "Tracker of debtors debt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased min-h-screen flex flex-col md:flex-row`}
      >
        <Sidebar />

        {children}

        <BottomNav />
      </body>
    </html>
  );
}