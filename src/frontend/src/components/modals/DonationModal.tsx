'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import DonationCompleteModal from '@/components/modals/DonationCompleteModal';
import { useRouter } from 'next/navigation'

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number) => Promise<void>;
}

export default function DonationModal({ isOpen, onClose, onDonate }: DonationModalProps) {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [donatePoints, setDonatePoints] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      const userId = 1;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/points`)
        .then(res => res.json())
        .then(data => setUserPoints(data.points))
        .catch(() => setUserPoints(0));
    }
  }, [isOpen]);

  const handleDonate = async () => {
    if (donatePoints <= 0) {
      alert('1원 이상 입력해주세요!');
      return;
    }
    if (donatePoints > userPoints) {
      alert('보유 포인트를 초과할 수 없습니다.');
      return;
    }

    setLoading(true);

    try {
      await onDonate(donatePoints); // 상위에서 서버 요청!
      setShowCompleteModal(true);
    } catch (e: any) {
      alert(e.message || '기부에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

              {/* 햄스터 이미지 */}
              <div className="mb-4 flex justify-center">
                <Image
                  src="/(누끼)햄스터_대표로고.png"
                  alt="기부하는 햄스터"
                  width={140}
                  height={140}
                />
              </div>

              {/* 제목 */}
              <h2 className="text-lg font-bold mb-4">포인트 기부하기</h2>

              {/* 포인트 정보 */}
              <div className="bg-[#FFF4F4] rounded-2xl px-4 py-3 mb-4">
                <div className="flex justify-between text-sm font-medium text-gray-600 py-1">
                  <span>보유 포인트</span>
                  <span>{userPoints.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-600 py-1">
                  <label htmlFor="donatePoints">기부할 포인트</label>
                  {/* 입력 + '원' 묶음 */}
                  <div className="flex items-center "></div>
                  <input
                    id="donatePoints"
                    type="number"
                    min={0}
                    max={userPoints}
                    value={donatePoints === 0 ? '' : donatePoints}
                    onChange={(e) => {
                      const val = e.target.value;
                      const cleaned = val.replace(/^0+(?=\d)/, '');
                      const num = Number(cleaned);
                      if (num <= userPoints) {
                        setDonatePoints(num);
                      }
                    }}
                    className="w-[100px] text-right border border-gray-300 rounded-md px-2 py-1 text-black"
                  />
                  <span className="text-gray-500">원</span>
                </div>
              </div>

              {/* 기부하기 버튼 */}
              <button
                className="w-full bg-[#FFB6B6] hover:bg-[#ffbfbf] text-white font-bold py-2 rounded-xl"
                onClick={handleDonate}
              >
                기부하기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 기부 완료 모달 */}
      <DonationCompleteModal
        isOpen={showCompleteModal}
        onClose={() => {
          setShowCompleteModal(false);
          onClose(); // 기부 완료 후 기부 모달도 닫기
          router.push('/donation')
        }}
      />
    </>
  );
}
