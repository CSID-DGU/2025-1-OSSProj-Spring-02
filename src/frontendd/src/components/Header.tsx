'use client';
import { useRouter } from 'next/navigation';
import { PiUserCircleFill } from "react-icons/pi";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full py-2 p-4">
      <div className="flex flex-col gap-4">
        {/* 상단: 타이틀 + 아이콘 */}
        <div className="flex items-center justify-between">
          {/* 왼쪽 타이틀 */}
          <div className="flex items-baseline">
            <span className="text-[25px] font-bold whitespace-nowrap">
              돈쭐
            </span>
            <span className="text-[15px] font-medium ml-2 whitespace-nowrap">
              : 소비에 선행을 더하다
            </span>
          </div>

          {/* 오른쪽 아이콘 */}
          <div className="flex-shrink-0 ml-4">
            <button onClick={() => router.push('/mypage')}>
              <PiUserCircleFill className="w-6 h-6 text-[#49454F]" />
            </button>
          </div>
        </div>

        {/* 하단: 검색창 */}
        <div className="flex items-center w-full bg-[#EEEEF0] rounded-lg px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#91929F] flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="어떤 가게를 찾아볼까요?"
            className="flex-grow pl-2 text-sm bg-transparent placeholder:text-[#91929F] focus:outline-none"
          />
          <div className="h-5 bg-gray-300 mx-2 w-px" />
          <button className="text-sm text-[#4C4C57] hover:text-black">검색</button>
        </div>
      </div>
    </header>
  );
}


