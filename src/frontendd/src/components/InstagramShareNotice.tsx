// src/components/InstagramShareNotice.tsx
import { FaInstagram } from 'react-icons/fa';

export default function InstagramShareNotice() {
  return (
    <div className="relative flex flex-col items-center">
      {/* 항상 보이는 말풍선 */}
      <div className="absolute -top-16 bg-white border border-gray-300 rounded-lg shadow px-4 py-2 text-xs text-gray-600 w-64 text-center z-10">
        인스타그램 스토리에 공유하고 싶다면<br />
        이미지를 저장한 후 스토리에 업로드해주세요 💛
        <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-3 h-3 bg-white border-l border-b border-gray-300 rotate-45 z-[-1]" />
      </div>

      {/* TIP 버튼 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#FDF4E7] rounded-full shadow-sm mt-8">
        <FaInstagram className="text-[#E4405F] text-lg" />
        <span className="font-medium">스토리 공유 TIP</span>
      </div>
    </div>
  );
}
