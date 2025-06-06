'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

interface DonationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationCompleteModal({ isOpen, onClose }: DonationCompleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-50 bg-white rounded-[40px] px-6 pt-6 pb-6 w-[320px] text-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute text-white top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#8B8989]/40 rounded-lg"
            >
              <IoClose className="w-6 h-6" />
            </button>

            {/* 이미지 */}
            <div className="mb-2 flex justify-center">
              <Image
                src="/donation_thankyou.png" // 이미지 파일은 public 폴더에 저장
                alt="기부 완료 햄스터"
                width={140}
                height={140}
              />
            </div>

            {/* 타이틀 */}
            <h2 className="text-[18px] font-bold text-black mb-2">기부 완료</h2>

            {/* 메시지 박스 */}
            <div className="bg-[#FFF4F4] rounded-2xl px-4 py-4 text-sm text-gray-800 mb-4">
              <p>착한 소비에 이어 소중한 기부까지<br />
              덕분에 세상이 더 따뜻해졌어요!<br />
              앞으로도 돈쭐, 같이 해요!</p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className="w-full bg-[#FFB6B6] hover:bg-[#ff9a9a] text-white font-bold py-2 rounded-xl"
            >
              확인
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
