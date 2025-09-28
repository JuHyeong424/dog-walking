"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient();

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Supabase 회원가입 에러:', error);
      alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
    } else {
      alert('회원가입이 완료되었습니다. 이메일 인증을 위해 메일함을 확인해 주세요.');
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-xs p-6 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">회원가입</h1>
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
            onClick={handleSignUp}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            가입하기
          </button>
          <div className="text-center">
            <Link href="/login" className="text-sm text-blue-500 hover:underline">
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
