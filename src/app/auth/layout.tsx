import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/app/frontend/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/frontend/SiteHeader";
import CommonClient from "../CommonClient";
import Chat from "@/shared/Chat/Chat";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-neutral-200 text-base dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
        <SiteHeader />
        {children}
        <CommonClient />
        <Chat />
        <Footer />
      </body>
    </html>
  );
}
