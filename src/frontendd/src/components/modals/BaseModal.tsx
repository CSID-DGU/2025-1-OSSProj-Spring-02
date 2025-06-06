'use client';
import React from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  center?: boolean; // 중앙 정렬 vs 하단 고정
}

export default function BaseModal({ isOpen, onClose, children, center = true }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      {/* 밝은 오버레이 배경 */}
      <div className="fixed inset-0 bg-white/60  z-40" onClick={onClose} />
      
      {/* 모달 본체 */}
      <div className="relative z-50 w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
