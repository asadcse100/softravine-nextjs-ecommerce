import { Poppins } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/app/admin/components/Sidebar";
import Chat from "@/shared/Chat/Chat";
import Header from "@/app/admin/components/Header";
import PageWrapper from "@/app/admin/components/PageWrapper";
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
            <PageWrapper>{children}</PageWrapper>
            {/* <Chat /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
