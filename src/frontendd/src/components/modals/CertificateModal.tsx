'use client';

import CertificatePreview from '../CertificatePreview';
import InstagramShareNotice from '../InstagramShareNotice';
import html2canvas from 'html2canvas';
import { IoClose, IoDownloadOutline } from 'react-icons/io5';

interface ModalProps {
  name: string;
  date: string;
  message: string;
  representative: string;
  onClose: () => void;
}

export default function CertificateModal({ name, onClose }: ModalProps) {
  const handleDownload = async () => {
    const element = document.getElementById('certificate');
    if (!element) return;

    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'donzzul-certificate.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="bg-white rounded-xl w-full max-w-[768px] max-h-[90vh] flex flex-col p-4 overflow-hidden">
        
        {/* 1. 증서 미리보기 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto">
          <CertificatePreview name={name} />
        </div>

        {/* 2. 캡처용 숨김 영역 */}
        <div id="capture-target" className="hidden w-[768px] h-[1087px] bg-white">
          <CertificatePreview name={name} fixed />
        </div>

        {/* 하단 영역: 공유 TIP + 버튼 가로 정렬 */}
        <div className="mt-4 mb-8 flex flex-row items-center justify-between gap-7 flex-wrap">
          {/* 공유 TIP */}
          <div className="flex-1 min-w-0">
            <InstagramShareNotice />
          </div>

          {/* 버튼 그룹 */}
          <div className=" mt-9 flex gap-2 shrink-0">
            <button
              onClick={onClose}
              className="text-xl p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition"
              aria-label="닫기"
            >
              <IoClose />
            </button>
            <button
              onClick={handleDownload}
              className="text-xl p-2 rounded-full bg-[#FFD70D] hover:bg-yellow-300 transition"
              aria-label="저장"
            >
              <IoDownloadOutline />
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}
