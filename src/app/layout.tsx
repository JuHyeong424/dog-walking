"use client";

import Link from "next/link";
import "@/app/globals.css";
import Providers from "@/app/providers";
import { KakaoMapScriptProvider } from "@/context/KakaoMapScriptProvider";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("로그아웃 되었습니다.");
    router.push("/");
    router.refresh();
  };

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
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="w-full">
        <KakaoMapScriptProvider>
          <Providers>{children}</Providers>
        </KakaoMapScriptProvider>
      </div>
    </main>
    </body>
    </html>
  );
}
