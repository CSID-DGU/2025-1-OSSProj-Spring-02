// components/NearbySection.tsx
'use client';

import { useEffect, useState } from 'react'
import Image from 'next/image';
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import { useRouter, useSearchParams} from 'next/navigation'

// const dummyNearbyStores = [
//   { id: 1, name: '필동 서점', description: '우리동네 따뜻한 서점', img: '/서점.jpg' },
//   { id: 2, name: '필동 세탁소', description: '행복을 빨래해요', img: '/세탁소.png' },
//   { id: 3, name: '진짜 파스타', description: '진심을 담아 요리해요', img: '/파스타집.jpg' },
//   { id: 4, name: '필동 서점', description: '우리동네 따뜻한 서점', img: '/서점.jpg' },
//   { id: 5, name: '필동 세탁소', description: '행복을 빨래해요', img: '/세탁소.png' },
//   { id: 6, name: '진짜 파스타', description: '진심을 담아 요리해요', img: '/파스타집.jpg' },
// ];

interface Store {
  id: number
  name: string
  description: string
  image: string
}


export default function NearbyDonjjul() {
  const [stores, setStores] = useState<Store[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/top6`)
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((err) => {
        console.error('가게 목록 불러오기 실패:', err)
        setStores([])
      })
  }, [])

  return (
    <>
   <Header/> 
    <div className="w-full p-4 min-h-screen">
      {/* 내 주변 */}
      <section className="self-start">
        <h2 className="text-lg font-bold mb-2">
          <span className="text-[#FFD735]">|</span> 내 주변 돈쭐 가게
        </h2>
        {stores.map((store) => (
          <div key={store.id} className="flex items-center mb-4">
            <div className="w-[70px] h-[70px] relative flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={`http://localhost:8080/images/${store.image}`}
                alt={store.name}
                fill
                className="object-cover"
                />
            </div>
            <div className="ml-3 flex flex-col flex-grow">
              <p className="text-[15px] font-bold">{store.name}</p>
              <p className="text-[11px] font-bold text-[#A3A3A3]">{store.description}</p>
            </div>
            <button
              className="ml-15 bg-[#FFD735] text-sm px-5 py-2 rounded-full"
              onClick={() => {
                router.push(`/store/${store.id}`);
              }}
              >
                more
              </button>
          </div>
        ))}
      </section>
    </div>
    <BottomTab />
    </>
  );
}
