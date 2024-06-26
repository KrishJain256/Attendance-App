// import { Inter } from "next/font/google";
// import "./globals.css";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
  title: "IITK Attendance",
  description: "Face Detection Attendance for IITK",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={fontSans.className}>


          {children}
          {/* <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div> */}

      </body>
    </html>
  );
}