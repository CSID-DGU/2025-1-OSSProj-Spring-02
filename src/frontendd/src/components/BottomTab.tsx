'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import PhotoGuideModal from '@/components/modals/PhotoGuideModal';

interface TabItem {
  label: string;
  path: string;
  center?: boolean;
}

const tabs: TabItem[] = [
  { label: '착한 가게', path: '/main' },
  { label: '커뮤니티', path: '/community/free' },
  { label: '소비 인증', path: '/certify', center: true },
  { label: '지도', path: '/map' },
  { label: '기부하기', path: '/donation' },
];

export default function BottomTab() {
  const router = useRouter();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [showPhotoGuide, setShowPhotoGuide] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full h-[70px] bg-white border-t border-gray-200 flex justify-around items-center z-50">
        {tabs.map((tab, index) => {
          const isActive = pathname.startsWith(tab.path); // ✅ 수정된 부분
          const isCenter = tab.center;

          const handleClick = () => {
            if (isCenter) {
              setShowPhotoGuide(true);
            } else if (tab.path) {
              router.push(tab.path);
            }
          };

          return (
            <button
              key={index}
              onClick={handleClick}
              className={`flex flex-col items-center w-14 ${tab.center ? '-mt-3' : ''}`}
            >
              <div
                className={`mb-1 rounded-full flex items-center justify-center ${
                  isCenter
                    ? 'bg-[#FFD735] text-white w-12 h-12'
                    : isActive
                    ? 'bg-[#FFD735] w-6 h-6'
                    : 'bg-[#CFCFCF] w-6 h-6'
                }`}
              >
                {tab.center && (
                  <span className="text-4xl leading-none font-bold">+</span>
                )}
              </div>
              <span className={`text-[11px] ${isActive ? 'text-black' : 'text-black'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </footer>
      <PhotoGuideModal isOpen={showPhotoGuide} onClose={() => setOpenModal(false)} />
    </>
  );
}
