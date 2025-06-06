'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

interface OCRFailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OCRFailModal({ isOpen, onClose }: OCRFailModalProps) {
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
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button onClick={onClose} className="absolute text-white top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#8B8989]/44 rounded-lg shadow-sm">
              <IoClose className='w-10 h-10'/>
            </button>

            {/* 이미지 */}
            <div className="mb-4 flex justify-center">
              <Image src="/(누끼)햄스터_사과.png" alt="주의 캐릭터" width={100} height={100} />
            </div>
            <div className="bg-[#FA9898]/31 w-full max-w-[500px] rounded-[30px] px-4 py-3">
            {/* 제목 */}
            <div className="bg-[#FFFFFF]/80 rounded-full text-[50px] w-[150px] px-4 py-1 mx-auto mb-5">
                <h2 className="text-base font-bold">인식 오류</h2>
            </div>
            {/* 본문 내용 */}
            <div className="text-sm leading-relaxed px-2">
              <p><span className="">죄송해요! 영수증이 잘 보이지 않아 인식이 어려웠어요.</span></p>
              <br/>
              <p><span className="">다시 한 번만 촬용해주실 수 있을까요? </span></p>
              <br/>
              <p><span className="">정확한 인식을 위해 조금만 도와주세요🙏🏻</span></p>
            </div>

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className="mt-4 w-[150px] py-2 bg-[#FA9898]/82 text-white font-bold rounded-full"
            >
              다시 촬영하기
            </button>
            </div>
          </motion.div>
          
        </div>
        
      )}
    </AnimatePresence>
  );
}
