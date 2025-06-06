'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoSettingsSharp } from 'react-icons/io5';
import Image from 'next/image';
import BottomTab from '@/components/BottomTab';
import CertificateModal from '@/components/modals/CertificateModal'

export default function HistoryPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const userId = 1;
  

  const user = { name: '이설후' }; // TODO: DB 연동 시 교체
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(
    today.getDate()
  ).padStart(2, '0')}일`;

  const message = `이 상장은 착한 소비로\n선한 영향력을 전파하고,\n‘돈쭐’로 세상에 따뜻함을 퍼뜨린\n당신에게 수여합니다.`;
  const representative = '오픈소스프로젝트 2조 Spring';
  // 타입 정의
  type Review = {
    id: number;
    date: string;
    type: '리뷰';
    rating: number;
    images: string[];
    content: string;
  };

  type Proposal = {
    id: number;
    date: string;
    type: '가게 제보';
    content: string;
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);


  // 더미 데이터
  // const reviewList: ReviewItem[] = [
  //   {
  //     id: 1,
  //     date: '2025.04.10',
  //     type: '리뷰',
  //     rating: 5,
  //     images: ['/성심당2.jpg', '/성심당3.jpg', '/성심당.jpg'],
  //     content: '선행하는 빵 맛집 발견했어요~!\n짱맛\n말 모 말 모\n튀김 소보루 삼백 개 사감 ㅅㄱ',
  //   },
  //   {
  //     id: 2,
  //     date: '2025.03.10',
  //     type: '가게 제보',
  //     content: '성심당 - 마음을 먹어요',
  //   },
  // ];

  useEffect(() => {
  // 닉네임 불러오기
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my/nickname`, { method: 'GET',// credentials, headers 등 실제 인증추가
    })
    .then(res => res.json())
    .then(data => setNickname(data.nickname));

    // 리뷰 내역 가져오기
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      const mapped = data.map((r: any) => ({
        id: r.id,
        date: r.createdAt?.slice(0, 10).replace(/-/g, '.') ?? '', // 날짜 가공
        type: '리뷰',
        rating: r.rating,
        images: r.images || [], // API에 따라 다름
        content: r.content,
      }));
      setReviews(mapped);
    });

  // 제보 내역 가져오기
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      const mapped = data.map((p: any) => ({
        id: p.id,
        date: p.createdAt?.slice(0, 10).replace(/-/g, '.') ?? '',
        type: '가게 제보',
        content: p.reason
      }));
      setProposals(mapped);
    });

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-[80px]">
      {/* 헤더 */}
      <div className="relative bg-white py-4 border-b border-gray-200 flex items-center justify-center">
        <button onClick={() => router.back()} className="absolute left-4 text-yellow-500 text-xl">
          <IoChevronBack />
        </button>
        <h1 className="text-lg font-semibold">돈쭐 내역</h1>
        <IoSettingsSharp className="absolute right-4 text-yellow-500 text-xl" />
      </div>

      {/* 프로필 영역 */}
      <div>
        <div className="flex flex-col items-center py-6">
          <Image src="/햄스터_대표로고.png" alt="프로필 캐릭터" width={150} height={100} className="rounded-full" />
          <p className="mt-5 text-lg font-bold">{nickname}님</p>
        </div>

        {/* 버튼 영역 */}
        <div className="w-full px-6 mb-8 pt-4 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-[#FFE55C] rounded-full shadow text-sm font-semibold"
          >
            돈쭐 증서 발급하기
          </button>
        </div>
      </div>

      {showModal && (
        <CertificateModal
          name={nickname}
          date={formattedDate}
          message={message}
          representative={representative}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* 돈쭐 내역 카드 리스트 */}
      <div className="flex-1 bg-[#FFF9E5] px-4 pt-6 pb-20">
        <div className="max-w-xl mx-auto">
          {reviews.map((item) => (
            <div key={'review-' + item.id} className="bg-white rounded-2xl p-5 shadow mb-4 text-[#3D3D3D]">
              <div className="flex justify-between items-center text-sm mb-2">
                <span>[{item.date}]</span>
                <span className="font-semibold whitespace-nowrap">[{item.type}]</span>
              </div>

              {item.type === '리뷰' ? (
                <>
                  <div className="flex items-center mb-2 text-yellow-400 text-base">
                    {'★'.repeat(item.rating)}
                  </div>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {item.images.map((src, idx) => (
                      <Image key={idx} src={src} alt={`img${idx}`} width={60} height={60} className="rounded-md" />
                    ))}
                  </div>
                  <p className="text-sm whitespace-pre-line">{item.content}</p>
                </>
              ) : (
                <p className="text-sm mt-2">{item.content}</p>
              )}
            </div>
          ))}
          {/* 제보 목록 */}
          {proposals.map((item) => (
            <div key={'proposal-' + item.id} className="bg-white rounded-2xl p-5 shadow mb-4 text-[#3D3D3D]">
              <div className="flex justify-between items-center text-sm mb-2">
                <span>[{item.date}]</span>
                <span className="font-semibold whitespace-nowrap">[가게 제보]</span>
              </div>
              <p className="text-sm mt-2">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 탭 */}
      <BottomTab />
    </div>
  );
}
