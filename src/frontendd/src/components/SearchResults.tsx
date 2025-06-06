'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { BiLike, BiDislike } from 'react-icons/bi'
import { LiaCommentDots } from 'react-icons/lia'

interface Post {
  id: number
  nickname: string
  title: string
  excerpt: string
  thumbnails: string[]
  date: string
  likes: number
  dislikes: number
  comments: number
}

// 예시용 더미 데이터 (실제 검색 결과 배열로 대체하세요)
const dummyPosts: Post[] = [
  {
    id: 1,
    nickname: '소금빵장인',
    title: '와 여기 제육 진짜 찐이네요',
    excerpt:
      '불맛 쥑이고 ㄷㄷ 양이 진짜 많습니다 사장님 너무 친절하신데, 결식아동카드 내밀어도 웃으며 반기시는 사장님은 오랜만이라 너무 감동이었습니다',
    thumbnails: ['/thumb1.jpg', '/thumb2.jpg', '/thumb3.jpg'],
    date: '2025-04-10',
    likes: 105,
    dislikes: 3,
    comments: 24,
  },
  // ... 추가 게시글
]

function SearchResults({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/community/free/${post.id}`}
          className="relative rounded-lg p-4 pb-16 bg-white shadow-lg"
        >
          {/* 작성자 프로필 */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/소금빵.jpg"
                alt={post.nickname}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <span className="text-[14px] font-semibold text-gray-800">
                {post.nickname}
              </span>
              <span className="text-xs text-gray-500">{post.date}</span>
            </div>
          </div>

          {/* 썸네일 */}
          <div className="flex gap-1 mb-4">
            {post.thumbnails.map((src, idx) => (
              <div
                key={idx}
                className="relative flex-1 h-24 rounded-lg overflow-hidden"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* 제목 */}
          <h3 className="font-semibold text-gray-800 mb-2 flex justify-between">
            {post.title}
            <FiChevronRight className="w-5 h-5 text-gray-400" />
          </h3>

          {/* 본문 */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          {/* 좋아요/싫어요/댓글 */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-xs text-gray-500">
            <button className="flex items-center gap-1">
              <BiLike className="w-4 h-4" /> {post.likes}
            </button>
            <button className="flex items-center gap-1">
              <BiDislike className="w-4 h-4" /> {post.dislikes}
            </button>
          </div>
          <span className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-500">
            <LiaCommentDots className="w-4 h-4" /> {post.comments}
          </span>
        </Link>
      ))}

      {/* 더보기 버튼 (전체 열 차지) */}
      <Link href="/community/free" className="col-span-full">
        <p className="text-center text-[13px] font-bold mt-4">더보기</p>
      </Link>
    </div>
  )
}

function CommunityEmpty() {
  return (
    <div className="py-16 text-center bg-[#F8F8F8]">
      <img src ='/햄스터_흑백.png' 
      alt="검색 결과가 없을 때 보여주는 흑백 햄스터"
      className='flex w-32 block mx-auto mb-4'>
        </img>
      <p className='font-bold'>앗, 해당 검색어에 맞는 게시글이 아직 없어요!</p>
    </div>
  )
}

export default function CommunitySection({
  posts = dummyPosts, // 실제론 검색 결과 state나 props를 전달하세요
}: {
  posts?: Post[]
}) {
  const hasResults = posts && posts.length > 0

  return (
    <section>
      <div className="flex gap-3 mb-2">
        <p className="border-l-4 border-[#FFD735] pl-2 text-[18px] font-bold">
          커뮤니티
        </p>
      </div>

      {hasResults ? (
        <SearchResults posts={posts!} />
      ) : (
        <CommunityEmpty />
      )}
    </section>
  )
}
