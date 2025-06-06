'use client';

import Image from 'next/image';

interface HeaderProps {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  favorites: number;
  logo: string;
}

export default function DonationHeaderCard({
  title,
  subtitle,
  phone,
  email,
  favorites,
  logo,
}: HeaderProps) {
  return (
    <div className="flex flex-col w-full gap-4">
      {/* 로고 */}
      <div className="flex justify-center">
        <Image
          src={logo}
          alt={title}
          width={160}
          height={100}
          className="object-contain mb-2"
        />
      </div>

      {/* 제목 + 부제목 */}
      <div className="flex items-baseline gap-x-2">
        <h1 className="text-lg lg:text-2xl font-bold text-[#26262C]">{title}</h1>
        <p className="text-sm lg:text-base text-[#3D3D3D]">{subtitle}</p>
      </div>

      {/* 후원문의 + 즐겨찾기 수 */}
      <div className="flex justify-between items-center text-xs lg:text-sm text-gray-600">
        <p>후원 문의 : {phone}</p>
        <div className="flex items-center gap-1">
          {/* 하트 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#F43F5E"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                     4.42 3 7.5 3c1.74 0 3.41 0.81 
                     4.5 2.09C13.09 3.81 14.76 3 
                     16.5 3 19.58 3 22 5.42 22 8.5c0 
                     3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="text-[#F43F5E] font-medium">누적기부 {favorites}회</span>
        </div>
      </div>

      {/* 이메일 */}
      <div className="text-xs lg:text-sm text-blue-700 underline ml-16 lg:ml-19">
        {email}
      </div>
    </div>
  );
}
