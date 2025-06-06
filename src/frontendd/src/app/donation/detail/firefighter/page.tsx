'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import BottomTab from '@/components/BottomTab';
import DonationHeaderCard from '@/components/DonationHeaderCard';
import DonationBodyText from '@/components/DonationBodyText';
import DonationModal from '@/components/modals/DonationModal';

const donation = {
  title: '국립소방병원',
  subtitle: '사단법인 수방가족희망나눔',
  phone: ' 070-8839-7007',
  email: '119@sharinghope119.or.kr',
  favorites: 511,
  logo: '/firefighters.jpg',
  bottomImage: '/donation_msf_bottom.png',
  summaryTitle: '“불길 속으로 뛰어든 영웅들을 위한 우리의 응원”',
  description: [
  '국립소방병원은 소방공무원의 건강 회복과 특수업무 관련 질병 치료를 위해 충청북도 음성에 건립 중인 공공 의료기관입니다.',
  '• 부지 39,343㎡, 302병상 규모의 종합병원 (2024년 12월 개원 예정)',
  '• 화상, 근골격계, 트라우마 등 소방관 특화 진료과 19개 운영',
  '• 소방공무원 대상 건강 유해인자 분석 및 질병 연구 수행',
  '• 충북 음성·진천·증평·괴산 등 의료취약지역 주민에게 공공진료 제공',
  '',
  '소방관은 국민의 생명을 위해 불길 속으로 달려갑니다.',
  '이제는 우리가 그들의 건강을 지켜줄 차례입니다.',
  '국립소방병원 건립에 대한 당신의 관심과 기부가, 대한민국을 지키는 이들에게 실질적인 응원이 됩니다.',
  '',
  '💛 기부금은 의료 장비 확충, 병원 시설 조성, 연구 환경 개선 등에 사용됩니다.💛',
  ],
};

export default function DonationDetailPage() {
  const [showModal, setShowModal] = useState(false);

  // 포인트 차감 로직
  const handleDonate = async (amount: number) => {
    const userId = 1; // 실제 로그인된 유저 ID로 교체
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "포인트 차감에 실패했습니다.");
      }
  };

  return (
    <div className="bg-white min-h-screen pb-28">
      <Header />

      <div className="w-full px-4 sm:px-6 pt-4 max-w-xl mx-auto">
        {/* 핑크 배경 */}
        <div className="bg-[#FFF4F4] rounded-2xl px-4 py-6">
          {/* 흰색 카드 영역 */}
          <div className="bg-white rounded-xl px-4 py-6 shadow-md w-full">
            {/* 헤더 카드 삽입 */}
            <DonationHeaderCard
              title={donation.title}
              subtitle={donation.subtitle}
              phone={donation.phone}
              email={donation.email}
              favorites={donation.favorites}
              logo={donation.logo}
            />

            {/* 구분선 */}
            <hr className="my-6 border-t border-gray-200" />

            {/* 본문 */}
            <DonationBodyText
              summaryTitle={donation.summaryTitle}
              description={donation.description}
              bottomImage={donation.bottomImage}
            />

            {/* 버튼 */}
            <div className="w-full">
              <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-white text-black text-base font-semibold py-3 rounded-xl border border-gray-300 shadow-md">
                기부하기
              </button>

              <DonationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDonate={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomTab />
    </div>
  );
}
