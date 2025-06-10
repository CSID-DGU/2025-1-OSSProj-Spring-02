'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { FiChevronRight, FiPlus } from 'react-icons/fi'
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import { useRouter, usePathname, useParams } from 'next/navigation'
import { FaStar, FaRegStar } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

interface StoreDetail {
  id: number
  name: string
  category: string
  address: string
  work_time: string
  store_phone: string
  image: string
  description: string
  rating: string
}

interface Review {
  id: number
  userId: number
  storeId: number
  rating: number
  content: string
  createdAt: string
}
export default function Store() {
  const router = useRouter()
  const { id } = useParams()
  const [store, setStore] = useState<StoreDetail | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])

// interface ReviewPost {
//   id: number
//   title: string
//   excerpt?: string
//   date: string
//   likes: number
//   dislikes : number
//   comments: number
//   rating: number // 별점
//   thumbnailUrl?: string
//   thumbnails: string[]
// }

// const dummyReview: ReviewPost[] = [
//   {
//       id: 1,
//       title: '선행하는 빵 맛집 발견했어요~!',
//       excerpt : '짱맛 말 모 말 모 튀김 소보루 삼백 개 사감 ㅅㄱ',
//       date: '2025-04-10',
//       likes: 105,
//       dislikes : 3,
//       comments: 24,
//       rating: 5,
//       thumbnailUrl: '/store.jpg',
//       thumbnails: ['/성심당3.jpg','/성심당2.jpg','/성심당.jpg'],
//   },
// ]

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/store/${id}`)  // ✅ 백엔드에서 id 기반 상세정보 요청
      .then((res) => res.json())
      .then((data) => setStore(data))
      .catch((err) => console.error('상세정보 요청 실패:', err))


    // 리뷰 리스트 가져오기
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/store/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('리뷰 응답: ', data)
          setReviews(data)
      })
      .catch((err) => {
        console.error('리뷰 불러오기 실패:', err)
        setReviews([])
      })
  }, [id])

  if (!store) return <p className="p-4">불러오는 중...</p>
  return (
    <>
      <Header />
     <div className="px-4">
      {/* ✅ 스크롤 콘텐츠 영역 */}
      <main className="min-h-screen bg-[#FFD735]/85 px-4 py-6 flex flex-col items-center rounded-[50px]">
        <div className="bg-white rounded-[40px] w-full max-w-md p-4 pb-20 shadow-md relative">
          {/* 이미지 + 닫기 */}
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative">
            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/images/${store.image}`} alt={store.name} fill className="object-cover" />
            <button
              onClick={() => router.back()}
              className="absolute top-2 right-2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* 가게 정보 */}
          <div className="mb-6">
            <div className='flex items-center gap-8'>
                <span className="font-bold text-[25px] ">{store.name}</span>
                <span className="text-[17px]">{store.category}</span>
            </div>    
              <p className="text-left text-[15px] text-[#747483]">{store.address}</p>
              <p className="text-left text-[15px] text-[#747483]">영업시간: {store.work_time} </p>
              <div className="flex justify-between text-[15px] text-[#747483]">
                <p>전화번호: {store.store_phone}</p>
                <div className='flex'>
                  <p className="text-blue-500">⭐ {store.rating}</p>
                  <p className='text-[#747483]'>(32)</p>
                </div>
              </div>
            </div>
      {/* 탭 */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">리뷰</h3>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">아직 리뷰가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r) => (
                <Link
                key={r.id}
                href={`/store/${r.storeId}`}
                className="relative border border-gray-200 rounded-lg p-4 pb-16 shadow-xl bg-white"
                >
                {/* 별점 + 제목 */}
                    <div>
                      <div className="flex items-center mb-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                            // i < p.rating 이면 채워진 별, 아니면 빈 별
                            return i < r.rating ? (
                            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                            ) : (
                            <FaRegStar key={i} className="w-4 h-4 text-gray-300" />
                            )
                        })}
                        </div>
                        {/* 썸네일 3개
                        <div className="flex gap-1 mt-2 mb-4">
                            {p.thumbnails.map((src, idx) => (
                            <div key={idx} className="relative h-10 w-10 rounded-md overflow-hidden">
                                <Image
                                src={src}
                                alt={`thumb-${idx}`}
                                fill
                                className="object-cover"
                                />
                            </div>
                            ))}
                        </div> */}
                    {/* 제목 */}
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{store.name}</h3>
                    </div>    

                {/* 본문 */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{r.content}</p>

                {/* 날짜: 오른쪽 상단 */}
                <span className="absolute top-4 right-5 text-[15px] text-gray-500">
                    {r.createdAt.split('T')[0]}
                </span>

                {/* 좋아요/싫어요: 왼쪽 하단 */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-blue-500">
                    <BiLike className='w-4 h-4'/> 2
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-500">
                    <BiDislike className='w-4 h-4'/> 0
                    </button>
                </div>

                {/* 코멘트 수: 오른쪽 하단 */}
                <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-500">
                    <LiaCommentDots className='w-4 h-4'/> 0
                </span>
                </Link>

            ))}
            </div>
          )}
          </div>
        </div>
      </main>
      
      {/* ✅ 하단탭 */}
      <BottomTab />
    
  </div> 
  </> 
  )
}