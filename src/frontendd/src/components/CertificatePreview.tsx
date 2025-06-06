import Image from 'next/image';
import React from 'react'; // React import 추가

interface Props {
  name: string;
  fixed?: boolean; // 캡처용 여부
}

export default function CertificatePreview({ name, fixed = false }: Props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const baseStyle = fixed
    ? 'w-[768px] h-[1087px]'
    : 'w-full max-w-[768px] aspect-[768/1087]'; // 반응형

  return (
    <div id={fixed ? undefined : 'certificate'} className={`relative ${baseStyle} bg-white shadow`}>
      <Image
        src="/인증서.png"
        alt="배경"
        fill
        className="object-cover"
      />
      {/* 이름 */}
      <div
          className={`
            absolute font-medium text-[12px] sm:text-[20px] md:text-[20px] lg:text-lg xl:text-xl
            right-[12.56%]  /* 35px / 768px */
            top-[44%]   /* 193px / 1087px */
            transform -translate-y-1/2  /* 텍스트 세로 중앙 정렬 (선택 사항) */
          `}
      >
        {name}
      </div>
      {/* 날짜 */}
      <div
            className={`absolute text-[13px] sm:text-[13px] md:text-[30px] lg:text-[80px] xl:text-xl
              top-[76.2%] /* 350px / 1087px */
              left-1/2 -translate-x-1/2`}
          >
        {year}년 {month}월 {day}일
      </div>
    </div>
  );
}