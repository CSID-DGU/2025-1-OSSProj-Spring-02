'use client';
import { HiLocationMarker } from "react-icons/hi";
import { motion, AnimatePresence } from 'framer-motion';

export default function LocationPermissionModal(
  {
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLocationRequest = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('✅ 위도:', latitude, '경도:', longitude);
            onClose(); // 위치 수신 완료 시 모달 닫기
          },
          (error) => {
            console.error('❌ 위치 권한 요청 실패:', error);
            alert('위치 권한 요청에 실패했어요. 브라우저 설정을 확인해주세요.');
          }
        );
      } else {
        alert('이 브라우저에서는 위치 정보를 지원하지 않아요.');
      }
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30">
          {/* 바깥 배경 클릭 시 닫힘 */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Bottom Sheet */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-50 w-full max-w-sm mx-auto bg-white rounded-t-[70px] pt-6 px-6 pb-20"
          >
            {/* 드래그 바 */}
            <div className="w-20 h-1.5 bg-[#FFC300] rounded-full mx-auto mb-4" />

            <div className="flex flex-col items-center text-center gap-1">
              <div className="flex items-center gap-2 justify-center">
                <HiLocationMarker className="text-[#FFC300] w-4 h-4" />
                <span className="text-[17px] font-bold">
                  내 위치를 확인하려면 동의가 필요해요
                </span>
              </div>
              <p className="text-[14px] mt-2 mb-4 text-gray-600">
                (필수) 위치기반 서비스 이용약관 동의
              </p>
            </div>

            <div className="w-full h-px border-[#D8D8D8] mb-2 border-t" />
            <button 
            onClick={handleLocationRequest}
            className="w-full py-2 text-[17px] font-bold text-[#FF8001]">
              동의하고 내 위치 확인하기
            </button>
            <div className="w-full h-px border-[#D8D8D8] mt-2 mb-2 border-t" />
            <button
              onClick={onClose}
              className="w-full text-[17px] font-bold text-[#6F6969] mt-2"
            >
              취소
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
