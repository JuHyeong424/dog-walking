import Link from "next/link";
import "@/app/globals.css";
import Providers from "@/app/providers";
import {KakaoMapScriptProvider} from "@/context/KakaoMapScriptProvider";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen flex flex-col">
    <header className="flex items-center h-26 p-4 shadow-md">
      <nav className="flex relative w-full items-center font-bold">
        <span className="absolute left-4">로고</span>
        <div className="mx-auto flex gap-6">
          <Link href="/">홈</Link>
          <Link href="/weather">날씨</Link>
          <Link href="/walking">경로 추적</Link>
          <Link href="/products">용품 추적</Link>
          <Link href="/dashboard">통계</Link>
          <Link href="/profile">프로필</Link>
          <Link href="/community">커뮤니티</Link>
        </div>
        <div className="absolute right-4 h-2 bg-blue-500 text-white rounded-xl p-5 flex items-center justify-center">
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </header>
    <main>
      <div className="p-4">
        <KakaoMapScriptProvider>
          <Providers>{children}</Providers>
        </KakaoMapScriptProvider>
      </div>
    </main>
    </body>
    </html>
  )
}
