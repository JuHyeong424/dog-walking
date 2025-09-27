"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    console.log('로그인 시도:', { email, password });

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase 로그인 에러:', error);
      alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
    } else {
      alert('로그인 되었습니다!');
      router.push('/profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-xs p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleSignIn}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            로그인하기
          </button>
          <Link href="/signup">
            <button
              className="w-full px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
