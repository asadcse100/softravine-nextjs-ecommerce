import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/app/(frontend)/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/(frontend)/SiteHeader";
import SubSiteHeader from "@/app/(frontend)/SubSiteHeader";
import CommonClient from "../CommonClient";
import Chat from "@/shared/Chat/Chat";

import type { Metadata } from 'next'


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
      <body className="bg-slate-200 text-base dark:bg-slate-800 text-slate-800 dark:text-slate-200">
        <SiteHeader />
        <SubSiteHeader />
        {children}
        <CommonClient />
        {/* <Chat /> */}
        <div className="bg-slate-800">
          <Footer />
        </div>
      </body>
    </html>
  );
}
