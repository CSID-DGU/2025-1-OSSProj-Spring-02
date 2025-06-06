'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OCRFailModal from '@/components/modals/OCRFailModal';


// base64 → Blob 변환 함수
function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const CameraScreen: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카메라 시작
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('카메라 접근 오류:', err);
      }
    };

    startCamera();

    const currentVideo = videoRef.current;

    return () => {
      if (currentVideo?.srcObject) {
        const tracks = (currentVideo.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // 촬영 및 백엔드 전송
  const takePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;


    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL('image/png');
    const imageBlob = dataURLtoBlob(imageData);
    const imageFile = new File([imageBlob], 'photo.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('rating', '5');
    formData.append('content', '캡처한 이미지');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/receipt/process`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // status 기반 분기
        if (result.status === 'registered') {
          // 이미 등록된 가게, 리뷰 작성 페이지로 이동
          alert('착한가게로 등록된 가게입니다. 리뷰 작성 화면으로 이동합니다.')
          console.log('넘기는 사업자번호:', result.business_number);
          router.push(`/review?bno=${result.business_number}`);
        } else if (result.status === 'unregistered') {
          // 신규 가게 제보 페이지로 이동
          alert('착한가게로 등록되어있지 않은 가게입니다. 새로운 가게 제보 화면으로 이동합니다.')
          console.log('전체 result:', result)
          router.push(`/submit_store?bno=${result.business_number}`);
        } else if (result.status === 'expired') {
          // 유효기간 초과 등
          alert(result.reason || '유효기간 초과 또는 인증 불가');
        } else {
          alert('알 수 없는 상태: ' + result.status);
        }
      } else {
        setIsModalOpen(true);  // 모달 띄우기
      }
    } catch (err) {
      console.error('이미지 업로드 에러:', err);
      alert('이미지 업로드 에러');
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      {/* 상단 바 */}
      <div className="w-full bg-[#FDDC55] min-h-[50px] relative z-10 flex items-center justify-center"></div>
      {/* 카메라 미리보기 */}
      <div className="flex-1 w-full bg-black flex items-center justify-center relative z-0">
        <video
          ref={videoRef}
          className="w-full h-full max-h-full object-cover"
          playsInline
          muted
        />
      </div>
      {/* 하단 바 + 촬영 버튼 */}
      <div className="w-full bg-[#FDDC55] h-30 flex items-center justify-center relative">
        <div className="w-16 h-16 bg-[#FDDC55] border border-black rounded-full flex items-center justify-center mt-2 mb-2">
          <div
            onClick={takePhoto}
            className="w-14 h-14 bg-white rounded-full border border-black active:scale-95 cursor-pointer"
          />
        </div>
        {/* 캡처용 canvas (숨김) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <OCRFailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CameraScreen;
