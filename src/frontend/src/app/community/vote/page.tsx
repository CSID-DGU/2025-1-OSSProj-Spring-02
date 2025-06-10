'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { FiPlus } from 'react-icons/fi'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import { useRouter, usePathname } from 'next/navigation'
import { FaStar, FaRegStar } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

interface StoreProposal {
  id: number;
  storeName: string;
  storeAddress: string | null;
  businessNumber: string;
  reason: string;
  status: string;
  createdAt: string;
}

// const dummyVote: VotePost[] = [
//   {
//       id: 1,
//       title: '선행하는 빵 맛집 발견했어요~!',
//       excerpt : '이번에 저희 동네에 새로 생긴 빵집이 있는데, 어찌나 빵이 쫀득하구 맛있던지 저희 가족들이 정말 단골이 되리라 했어요 근데 사장님께서 매달 고아원과 요양원에 빵들을 기부하시는 분이셨더라구요~!! 그것두 손수 예쁘게 포장하셔서 기부하시는 모습에 정말 감동받은 거 있죠? 이번 돈쭐 가게 후보로 추천합니다~^^',
//       date: '2025-04-10',
//       likes: 105,
//       dislikes : 3,
//       comments: 24,
//       rating: 5,
//       thumbnailUrl: '/store.jpg',
//       thumbnails: ['/성심당3.jpg','/성심당2.jpg','/성심당.jpg'],
//   },
// ]


export default function VotePage() {
  const [activeTab, setActiveTab] = useState<'free' | 'vote'>('vote')
  const [proposals, setProposals] = useState<StoreProposal[]>([]);
  const router = useRouter()
  const pathname = usePathname() 
  const tabs = [
    { key: 'free', label: '자유 게시판', href: '/community/free' },
    { key: 'vote', label: '투표 게시판', href: '/community/vote'},
  ]
  useEffect(() => {
    if (activeTab === 'vote') {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/proposals/user/1`) 
        .then(res => res.json())
        .then(data => {
          console.log('fetch proposals:', data);
          setProposals(data);
        })
        .catch(() => setProposals([]));
    }
  }, [activeTab]);
  return (
    <>
      <Header />

      <main className="px-4 pt-4 pb-28 bg-white flex-1">
        {/* 상단 배너 */}
        <div className="w-full overflow-hidden mb-4">
          <img src="/배너_커뮤니티2.png" alt="배너" className="w-full object-cover" />
        </div>

        <div className='flex items-center justify-between mb-4'>
        <p className="border-l-4 border-yellow-400 pl-2 font-bold text-[20px] mb-1">
              커뮤니티
        </p>

        {/* 탭 */}
        <div className="flex space-x-2 mb-4 px-2">
            {tabs.map((t) => {
                const isActive = pathname === t.href
                return (
                <button
                    key={t.key}
                    onClick={() => router.push(t.href)}
                    className={`flex-1 text-center py-1 px-2 rounded-full text-[13px] ${
                    isActive
                        ? 'bg-[#FFD735]/85 border border-[#B5B5B5]'
                        : 'bg-white border border-[#B5B5B5]'
                    }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'vote' &&
            proposals.map((p) => (
                <div key={p.id} className="relative border border-gray-200 rounded-lg p-4 pb-10 shadow-xl bg-white">
                  {/* 가게명 + 상태 */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{p.storeName}</span>
                    {/* <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">{p.status}</span> */}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{p.reason}</p>
                  {/* 날짜 (createdAt) */}
                  <span className="absolute top-4 right-9 text-xs text-gray-500">
                    {p.createdAt.split('T')[0]}
                  </span>

                  {/* 좋아요/싫어요: 왼쪽 하단 */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-500">
                        <BiLike className='w-4 h-4'/> 0
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-500">
                        <BiDislike className='w-4 h-4'/> 0
                      </button>
                  </div>

                  {/* 코멘트 수: 오른쪽 하단 */}
                  <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-500">
                      <LiaCommentDots className='w-4 h-4'/> 0
                  </span>
                </div>
              ))}
        </div>
      </main>

      {/* 플로팅 액션 버튼 */}
      <button
        onClick={() => console.log('새 글쓰기')}
        className="fixed bottom-24 right-6 w-8 h-8 bg-[#FFCD00] rounded-full flex items-center justify-center shadow-lg text-white text-2xl"
      >
        <FiPlus />
      </button>

      <BottomTab />
    </>
  );
}
