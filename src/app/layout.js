import { Lato, Poppins } from "next/font/google";
import "@/app/globals.css";
import SessionWrapper from "@/app/components/SessionWrapper";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Debt Tracker",
  description: "Tracker of debtors debt",
};

export default function RootLayout({ children }) {

  

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lato.variable} antialiased min-h-screen flex flex-col md:flex-row`}
      >
        <SessionWrapper>
          {children}
        </SessionWrapper>

      </body>
    </html>
  );
}