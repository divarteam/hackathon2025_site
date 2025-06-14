import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/src/app/styles/globals.css";
import { Toaster } from "@/src/shared/ui/sonner";
import localFont from 'next/font/local'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const lato = localFont({
  src: './Lato-Regular.ttf',
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Портал государственных услуг Российской Федерации",
  description: "Единый портал государственных услуг Российской Федерации. Здесь можно записаться к врачу, получить загранпаспорт, записать ребенка в детский сад, проверить и оплатить штрафы или судебную задолженность.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${lato.className} antialiased text-[16px] flex justify-center`}
      >
        <div className='xl:w-[1280px] w-full'>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
