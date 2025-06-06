'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoReload } from 'react-icons/io5';
import { AiOutlineLoading3Quarters  } from 'react-icons/ai';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // 자동 닫기 시간 (ms)
}

export default function LoadingModal({ isOpen, onClose, duration = 3000 }: LoadingModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // 모달이 사라질 때 타이머 정리
    }
  }, [isOpen, onClose, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-72 p-6 rounded-[30px] text-center shadow-lg"
          >
            {/* 로딩 아이콘 */}
            <div className="flex justify-center mb-4">
              <AiOutlineLoading3Quarters className="w-10 h-10 text-gray-500 animate-spin" />
            </div>

            <h2 className="text-lg font-semibold mb-1">잠시만 기다려주세요!</h2>
            <p className="text-sm text-gray-500">영수증을 인식하고 있어요~</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
