'use client';
import { Poppins } from "next/font/google";
import SideBar from "@/app/affiliate/components/Sidebar";
import Header from "@/app/affiliate/components/Header";
import PageWrapper from "@/app/affiliate/components/PageWrapper";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Poppins"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div className="flex min-h-screen">
          <SideBar></SideBar>
          <Header></Header>
          <PageWrapper children = {children}></PageWrapper>
          <Chat />
        </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
