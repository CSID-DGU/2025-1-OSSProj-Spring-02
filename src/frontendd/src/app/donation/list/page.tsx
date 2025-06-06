'use client';

import Header from '@/components/Header';
import BottomTab from '@/components/BottomTab';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DonationListPage() {
  const router = useRouter();

  const donationItems = [
    {
      id: 'firevictims',
      title: '산불 이재민 기부',
      subtitle: '구호 성금 전달',
      image: '/donation_wildfire.jpg',
    },
    {
      id: 'firefighter',
      title: '국립소방병원 기부',
      subtitle: '(주) 수방가족희망나눔',
      image: '/donation_firehospital.jpg',
    },
    {
      id: 'msf',
      title: '국경없는 의사회',
      subtitle: '국제 의료 구호 단체',
      image: '/donation_msf.jpg',
    },
  ];

  const handleShowMore = () => {
    console.log('더보기 클릭됨! (추후 연동 예정)');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      <Header />

      <div className="w-full px-4 sm:px-6 pt-2 max-w-2xl mx-auto">
        {/* 배너 캐러셀 (정적 이미지) */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <Image
            src="/banners.png"
            alt="기부 배너"
            width={800}
            height={200}
            className="rounded-xl w-full h-auto object-cover"
          />
          <div className="absolute bottom-2 right-3 text-xs sm:text-sm text-white bg-black bg-opacity-30 px-2 py-1 rounded">
            2/11
          </div>
        </div>

        {/* 기부 리스트 */}
        <div className="space-y-4 sm:space-y-5">
          {donationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-[#FFF4E6] px-3 py-3 sm:px-4 sm:py-3 rounded-xl shadow-sm w-full"
            >
              {/* 이미지 썸네일 */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="rounded-lg object-cover w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex flex-col justify-center ml-3 flex-grow">
                <span className="font-semibold text-sm sm:text-base">
                  {item.title}
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {item.subtitle}
                </span>
              </div>

              {/* 상세보기 버튼 */}
              <button
                onClick={() => router.push(`/donation/detail/${item.id}`)}
                className="ml-2 bg-yellow-400 text-white text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full whitespace-nowrap"
              >
                상세보기
              </button>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-6 mb-4 text-center">
          <button
            onClick={handleShowMore}
            className="text-sm sm:text-base text-black-500 hover:underline"
          >
            더보기
          </button>
        </div>
      </div>

      <BottomTab />
    </div>
  );
}
