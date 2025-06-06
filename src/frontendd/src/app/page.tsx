'use client';
import React from "react";
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
        <img src="/mainrogo.png" alt="로고" className="mt-15 mb-6 w-[200px] " />
        <button onClick={() => router.push('/login')}>
          <img src="/hamtory_rogo.png" alt="로그인 버튼" className="w-[200px]" />
        </button>
      </div>  
  );
}
