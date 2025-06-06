'use client'

import Image from 'next/image';
import Header from '@/components/Header';
import BottomTab from '@/components/BottomTab';
import SearchResults from '@/components/SearchResults';
import Link from 'next/link';

interface Store {
  id: number;
  name: string;
  description: string;
  img: string;
}

interface Post {
  id: number;
  nickname: string;
  title: string;
  excerpt: string;
  thumbnails: string[];
  date: string;
  likes: number;
  dislikes: number;
  comments: number;
}

const dummyNearbyStores: Store[] = [
  { id: 1, name: '필동 서점', description: '우리동네 따뜻한 서점', img: '/서점.jpg' },
  { id: 2, name: '필동 세탁소', description: '행복을 빨래해요', img: '/세탁소.png' },
  { id: 3, name: '진짜 파스타', description: '진심을 담아 요리해요', img: '/파스타집.jpg' },
];

const dummyPosts: Post[] = [
  {
    id: 1,
    nickname: '소금빵장인',
    title: '와 여기 제육 진짜 찐이네요',
    excerpt: '불맛 쥑이고 ㄷㄷ 양이 진짜 많습니다 사장님 너무 친절하신데, 결식아동카드 내밀어도 웃으며 반기시는 사장님은 오랜만이라 너무 감동이었습니다',
    thumbnails: ['/thumb1.jpg', '/thumb2.jpg', '/thumb3.jpg'],
    date: '2025-04-10',
    likes: 105,
    dislikes: 3,
    comments: 24,
  },
  // ... 추가 더미 데이터
];

export default function SearchResult() {
  return (
    <>
      <Header />
      <main className="w-full p-4 min-h-screen pb-20">
        {/* 내 주변 */}
        <section>
          <div className="flex gap-3 mb-2">
            <p className="border-l-4 border-[#FFD735] pl-2 text-[18px] font-bold">
              착한가게
            </p>
            <span className="text-[13px]">현재 위치에서 가까운 순으로 안내드려요.</span>
          </div>

          {dummyNearbyStores.map((store) => (
            <div key={store.id} className="flex items-center mb-4">
              <div className="w-[70px] h-[70px] relative flex-shrink-0 rounded-lg overflow-hidden">
                <Image src={store.img} alt={store.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-[15px] font-bold">{store.name}</p>
                <p className="text-[11px] text-[#A3A3A3]">{store.description}</p>
              </div>
            </div>
          ))}

          <Link href="/nearby_new">
            <p className="text-center text-[13px] font-bold mt-2">더보기</p>
          </Link>
        </section>
        {/* 검색결과 */}
        <SearchResults/>
      </main>

      <BottomTab />
    </>
  );
}
