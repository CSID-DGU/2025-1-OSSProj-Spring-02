'use client';

import BottomTab from '@/components/BottomTab';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';
import Link from 'next/link'

type Props = {
  icon: string;
  label: string;
  iconSize?: number; // 아이콘 크기 props
};

export default function MyPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-[#F9F9F9]">
      {/* 상단 헤더 */}
      <div className="relative bg-white py-4 border-b border-gray-200 flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-4 text-yellow-500 text-xl">
          <IoChevronBack />
        </button>
        <h1 className="text-lg font-semibold">마이 페이지</h1>
      </div>

      {/* 프로필 */}
      <div className="flex flex-col items-center py-6">
        <Image src="/햄스터_대표로고.png" alt="프로필 캐릭터" width={150} height={100} className="rounded-full" />
        <p className="mt-5 mb-3 text-lg font-bold">User 님</p>
      </div>

      {/* 기능 메뉴 */}
      <div className="grid grid-cols-3 gap-5 px-6 py-8 bg-white mx-4 rounded-3xl shadow-md">
      <Link href="/mypage_history">
        <MenuItem icon="/소비인증내역.png" label="돈쭐 내역" />
      </Link>    
        <MenuItem icon="/기부내역.png" label="기부 내역" />
        <MenuItem icon="/나의활동.png" label="커뮤니티 활동 내역" />
        <MenuItem icon="/포인트내역.png" label="포인트 내역" />
        <MenuItem icon="/계정정보.png" label="계정 정보" />
        <MenuItem icon="/환경설정.png" label="환경 설정" />
      </div>

      {/* 하단 탭 */}
      <BottomTab/>
    </div>
  );
}

const MenuItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center text-center">
    <Image src={icon} alt={label} width={45} height={45} />
    <p className="mt-1 text-sm whitespace-pre-line">{label}</p>
  </div>
);

const TabButton = ({ label }: { label: string }) => (
  <button className="flex flex-col items-center text-xs text-gray-600">{label}</button>
);
