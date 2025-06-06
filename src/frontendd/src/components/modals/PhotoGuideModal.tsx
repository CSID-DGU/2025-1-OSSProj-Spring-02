'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { useRouter } from 'next/navigation'



interface PhotoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export default function PhotoGuideModal({ isOpen, onClose }: PhotoGuideModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/camera'); // ✅ 카메라 페이지로 이동
  };

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
            className="relative z-50 bg-white rounded-[40px] px-2 pt-8 pb-2 w-pull text-center shadow-lg"
          >
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute text-white top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#8B8989]/44 rounded-lg shadow-sm">
              <IoClose className='w-10 h-10'/>
            </button>

            {/* 이미지 */}
            <div className="mb-4 flex justify-center">
              <Image src="/햄스터_주의.jpg" alt="주의 캐릭터" width={150} height={100} />
            </div>
            <div className="bg-[#FFEFC2] w-full max-w-[500px] rounded-[30px] px-4 py-3">
            {/* 제목 */}
            <div className="bg-[#FFFFFF]/80 rounded-full w-[150px]  px-4 py-1 mx-auto mb-5">
                <h2 className="text-base font-bold">촬영 주의사항</h2>
            </div>
            {/* 본문 내용 */}
            <div className="text-sm leading-relaxed px-2">
              <p><span className="">영수증의 인쇄된 면을 카메라에</span></p>
              <br/>
              <p><span className="">❗<span className='underline'>정면으로</span> </span> 맞춰주세요</p>
              <br/>
              <p><span className="">❗ 최대한 <span className='underline'></span>여백없이 가깝게</span> 맞춰주세요</p>
              <br/>
              <p><span className="">❗<span className='underline'>밝고 평평한 곳</span></span>에서 <span className='underline'>흔들리지 않게</span> 촬영해주세요</p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={handleConfirm}
              className="text-base mt-4 w-[150px] py-2 bg-[#FFC815]/61 text-white font-bold rounded-full"
            >
              확인
            </button>
            </div>
          </motion.div>
          
        </div>
        
      )}
    </AnimatePresence>
  );
}
