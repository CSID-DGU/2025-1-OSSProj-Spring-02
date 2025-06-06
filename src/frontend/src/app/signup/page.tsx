'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username,
      password,
      nickname,
      isAdmin: false, // 서버에서 null 오류 나지 않도록 설정
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert('회원가입 성공!');
        router.push('/login');
      } else {
        const err = await response.json();
        alert(`회원가입 실패: ${err.message || '알 수 없는 오류'}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버와의 연결에 실패했습니다.');
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Image
          src="/mainrogo.png"
          alt="로고"
          width={200}
          height={300}
          className="mb-6"
        />

        <form className="space-y-4 mt-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-[15px] w-full h-12 px-4 py-2 bg-white rounded-lg focus:border-yellow-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[15px] w-full h-12 px-4 py-2 bg-white rounded-lg focus:border-yellow-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-[15px] w-full h-12 px-4 py-2 bg-white rounded-lg focus:border-yellow-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 h-12 bg-[#FFD735] font-bold text-white font-medium rounded-lg hover:bg-yellow-400 transition mt-3"
          >
            회원 가입
          </button>
        </form>
    </div>      
  );
}
