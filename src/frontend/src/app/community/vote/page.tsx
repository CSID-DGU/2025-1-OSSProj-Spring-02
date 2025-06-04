'use client'

import { useState } from 'react'
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

interface VotePost {
  id: number
  title: string
  excerpt?: string
  date: string
  likes: number
  dislikes: number
  comments: number
  rating: number // 별점
  thumbnailUrl?: string
  thumbnails: string[]
}

const dummyVote: VotePost[] = [
  {
    id: 1,
    title: '선행하는 빵 맛집 발견했어요~!',
    excerpt:
      '이번에 저희 동네에 새로 생긴 빵집이 있는데, 어찌나 빵이 쫀득하구 맛있던지 저희 가족들이 정말 단골이 되리라 했어요 근데 사장님께서 매달 고아원과 요양원에 빵들을 기부하시는 분이셨더라구요~!! 그것두 손수 예쁘게 포장하셔서 기부하시는 모습에 정말 감동받은 거 있죠? 이번 돈쭐 가게 후보로 추천합니다~^^',
    date: '2025-04-10',
    likes: 105,
    dislikes: 3,
    comments: 24,
    rating: 5,
    thumbnailUrl: '/store.jpg',
    thumbnails: ['/성심당3.jpg', '/성심당2.jpg', '/성심당.jpg'],
  },
]


export default function FreePage() {
  const [activeTab, setActiveTab] = useState<'free' | 'vote'>('free')
  const [posts, setPosts] = useState<VotePost[]>(dummyVote)
  const router = useRouter()
  const pathname = usePathname()
  const tabs = [
    { key: 'free', label: '자유 게시판', href: '/community/free' },
    { key: 'vote', label: '투표 게시판', href: '/community/vote' },
  ]

  // 좋아요 클릭 핸들러 (실제로는 API 호출 등을 넣어야 함)
  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault()
    e.stopPropagation()
    // 예시: 로컬 상태에서 바로 증가
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    )
    // 실제로는 fetch로 서버에 좋아요 요청 보내고, 결과 받아와야 합니다.
  }

  // 싫어요 클릭 핸들러
  const handleDislike = (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, dislikes: p.dislikes + 1 } : p
      )
    )
  }

  return (
    <>
      <Header />

      <main className="px-4 pt-4 pb-28 bg-white flex-1">
        {/* 상단 배너 */}
        <div className="w-full overflow-hidden mb-4">
          <img
            src="/배너_커뮤니티2.png"
            alt="배너"
            className="w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="border-l-4 border-yellow-400 pl-2 font-bold text-[20px] mb-1">
            커뮤니티
          </p>

          {/* 탭 */}
          <div className="flex space-x-2 mb-4 px-2">
            {tabs.map(t => {
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
          {posts.map(p => (
            <Link
              key={p.id}
              href={`/community/vote/${p.id}`}
              className="relative border border-gray-200 rounded-lg p-4 pb-16 shadow-xl bg-white"
            >
              {/* 별점 + 제목 */}
              <div>
                <div className="flex items-center mb-1">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < p.rating ? (
                      <FaStar
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                      />
                    ) : (
                      <FaRegStar
                        key={i}
                        className="w-4 h-4 text-gray-300"
                      />
                    )
                  )}
                </div>

                {/* 썸네일 3개 */}
                <div className="flex gap-1 mt-2 mb-4">
                  {p.thumbnails.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative h-10 w-10 rounded-md overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`thumb-${idx}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* 제목 */}
                <h3 className="font-semibold text-gray-800 line-clamp-2">
                  {p.title}
                </h3>
              </div>

              {/* 본문 */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {p.excerpt}
              </p>

              {/* 날짜: 오른쪽 상단 */}
              <span className="absolute top-4 right-9 text-xs text-gray-500">
                {p.date}
              </span>

              {/* 좋아요/싫어요: 왼쪽 하단 */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-gray-500">
                <button
                  onClick={e => handleLike(e, p.id)}
                  className="flex items-center gap-1 hover:text-blue-500"
                >
                  <BiLike className="w-4 h-4" /> {p.likes}
                </button>
                <button
                  onClick={e => handleDislike(e, p.id)}
                  className="flex items-center gap-1 hover:text-red-500"
                >
                  <BiDislike className="w-4 h-4" /> {p.dislikes}
                </button>
              </div>

              {/* 코멘트 수: 오른쪽 하단 */}
              <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-500">
                <LiaCommentDots className="w-4 h-4" /> {p.comments}
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
