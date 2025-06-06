'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { BiLike, BiDislike } from 'react-icons/bi'
import { LiaCommentDots } from 'react-icons/lia'
import { IoSend, IoArrowBackCircle } from 'react-icons/io5'

interface Comment {
  id: number
  author: string
  text: string
  date: string
  avatarUrl: string
}

interface VotePostDetail {
  id: number
  nickname: string
  title: string
  excerpt: string
  thumbnails: string[]
  date: string
  likes: number
  dislikes: number
  comments: number
  rating: number
}

// 더미 댓글 데이터
const dummyComments: Comment[] = [
  { id: 1, author: '여름이야', text: '정말 맛있었어요! 추천 고고!', date: '1시간 전', avatarUrl: '/햄스터_깜짝.jpg' },
  { id: 2, author: '초여름', text: '소보로 진짜 최고입니다 👍', date: '2시간 전', avatarUrl: '/애기햄스터.png' },
]

export default function VotePostDetailPage() {
  const { postId } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<VotePostDetail | null>(null)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    setPost({
      id: Number(postId),
      nickname: '소금빵장인',
      title: '선행하는 빵 맛집 발견했어요~!',
      excerpt:
        '이번에 저희 동네에 새로 생긴 빵집이 있는데, 어찌나 빵이 쫀득하구 맛있던지 저희 가족들이 정말 단골이 되리라 했어요 근데 사장님께서 매달 고아원과 요양원에 빵들을 기부하시는 분이셨더라구요~!! 그것두 손수 예쁘게 포장하셔서 기부하시는 모습에 정말 감동받은 거 있죠? 이번 돈쭐 가게 후보로 추천합니다~^^',
      thumbnails: ['/성심당3.jpg', '/성심당2.jpg', '/성심당.jpg'],
      date: '2025-04-10',
      likes: 105,
      dislikes: 3,
      comments: dummyComments.length,
      rating: 5,
    })
  }, [postId])

  const handleSend = () => {
    if (newComment.trim()) {
      dummyComments.push({
        id: dummyComments.length + 1,
        author: '나',
        text: newComment,
        date: '방금 전',
        avatarUrl: '/햄스터_깜짝.jpg',
      })
      setNewComment('')
      setPost((prev) => prev && { ...prev, comments: prev.comments + 1 })
    }
  }

  if (!post) return null

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 bg-white overflow-y-auto">
        <div className="flex items-center gap-3 py-2 mb-3">
          <IoArrowBackCircle
            className="w-6 h-6 text-[#FFD70D] cursor-pointer"
            onClick={() => router.push('/community/vote')}
          />
          <span className="font-bold">투표게시판</span>
        </div>
        {/* ★ 작성자 프로필 영역 추가 ★ */}
        <div className="flex items-center space-x-3 mb-4">
            {/* 아바타 */}
            <div className="w-8 h-8 border border-[#B5B5B5]/70 rounded-full overflow-hidden bg-gray-200">
            <Image
                // 여기에 실제 작성자 프로필 URL을 넣어주세요.
                src="/소금빵.jpg"
                alt={post.nickname}
                width={40}
                height={40}
                className="object-cover"
            />
            </div>
            {/* 닉네임 + 작성일 */}
            <div className="flex flex-1 items-center justify-between">
            <span className="text-[14px] font-semibold text-gray-800">{post.nickname}</span>
            <span className="text-xs text-gray-500">{post.date}</span>
            </div>
        </div>


        {/* 썸네일 3장 */}
        <div className="flex gap-1 mb-4">
          {post.thumbnails.map((src, i) => (
            <div key={i} className="relative flex-1 h-24 lg:h-60 rounded-lg overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* 제목/메타 */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-semibold text-[17px] flex-1 line-clamp-2">{post.title}</h1>
        </div>

        {/* 본문 */}
        <p className="text-gray-700 leading-relaxed text-[13px] mb-6">{post.excerpt}</p>

        {/* 좋아요·싫어요·댓글 */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <BiLike className="w-4 h-4" /> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <BiDislike className="w-4 h-4" /> {post.dislikes}
          </span>
          <span className="flex items-center gap-1">
            <LiaCommentDots className="w-4 h-4" /> {post.comments}
          </span>
        </div>

        {/* 댓글 입력창 */}
        <div className="flex items-center mb-4 border-2 border-gray-200 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleSend} className="px-4 text-xl text-[#FFD735]">
            <IoSend />
          </button>
        </div>

        {/* 댓글 리스트 */}
        <div className="space-y-3 pb-8">
          {dummyComments.map((c) => (
            <div key={c.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 border border-[#B5B5B5] rounded-full overflow-hidden bg-gray-200">
                <Image src={c.avatarUrl} alt="" width={32} height={32} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                  <span className="font-semibold text-[15px] text-gray-800">{c.author}</span>
                  <span>· {c.date}</span>
                </div>
                <p className="text-[13px] text-gray-600">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 하단탭: 고정 */}
      <BottomTab />
    </>
  )
}