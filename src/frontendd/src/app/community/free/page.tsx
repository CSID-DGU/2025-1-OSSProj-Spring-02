'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { FiPlus } from 'react-icons/fi'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'


interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  comments: number
  likes: number
  dislikes : number
}

const dummyPosts: Post[] = [
  { id: 1, title: '시험은 왜 존재하는가', excerpt: '저는 시험기간이 너무 싫습니다… 여러분도 시험기간이 싫으시죠? 혹시 시험이 언제끝나시나요 너무너무 싫당 진짜', date: '2025-04-10', comments: 3, likes: 105, dislikes:3},
  { id: 2, title: '선행하는 행복 발견했어요~!', excerpt: '커뮤니티 활동 중에…', date: '2025-04-09', comments: 5, likes: 74 ,dislikes:3},
  // …더미 데이터
]

export default function FreePage() {
  const [activeTab, setActiveTab] = useState<'free' | 'vote'>('free')
  const router = useRouter()
  const pathname = usePathname() 
  const tabs = [
    { key: 'free', label: '자유 게시판', href: '/community/free' },
    { key: 'vote', label: '투표 게시판', href: '/community/vote'},
  ]

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
                )
            })}
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyPosts.map((p) => (
            <Link
            key={p.id}
            href={`/community/free/${p.id}`}
            className="relative border border-gray-200 rounded-lg p-4 pb-16 shadow-xl bg-white"
            >

            {/* 제목 + 화살표 */}
            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{p.title}</h3>
            </div>

            {/* 본문 */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.excerpt}</p>

            {/* 날짜: 오른쪽 상단 */}
            <span className="absolute top-4 right-9 text-xs text-gray-500">
                {p.date}
            </span>

            {/* 좋아요/싫어요: 왼쪽 하단 */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-500">
                <BiLike className='w-4 h-4'/> {p.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-red-500">
                <BiDislike className='w-4 h-4'/> {p.dislikes}
                </button>
            </div>

            {/* 코멘트 수: 오른쪽 하단 */}
            <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-500">
                <LiaCommentDots className='w-4 h-4'/> {p.comments}
            </span>
            </Link>

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
  )
}
