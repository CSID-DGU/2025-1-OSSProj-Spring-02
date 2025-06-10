'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Store {
  id: number
  name: string
  description: string
  image: string
}

export default function NearbySection() {
  const [nearbyStores, setNearbyStores] = useState<Store[]>([])
  const [newStores, setNewStores] = useState<Store[]>([])
  const [showAllNearby, setShowAllNearby] = useState(false)
  const [showAllNew, setShowAllNew] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/top6`)  // 백엔드 구현 필요
      .then(res => res.json())
      .then(setNearbyStores)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/top12`)      // 백엔드 구현 필요
      .then(res => res.json())
      .then(setNewStores)
  }, [])

  const visibleNearby = showAllNearby ? nearbyStores : nearbyStores.slice(0, 3)
  const visibleNew = showAllNew ? newStores : newStores.slice(0, 3)

  return (
    <div className="w-full p-4">
      {/* 내 주변 돈쭐 가게 */}
      <section className="self-start">
        <h2 className="text-lg font-bold mb-2">
          <span className="text-[#FFD735]">|</span> 내 주변 돈쭐 가게
        </h2>
        {visibleNearby.map(store => (
          <StoreCard key={store.id} store={store} router={router} />
        ))}
        {!showAllNearby && nearbyStores.length > 3 && (
          <button
            onClick={() => setShowAllNearby(true)}
            className="text-center w-full mt-2 text-black font-bold"
          >
            더보기
          </button>
        )}
      </section>

      {/* 신규 돈쭐 가게 */}
      <section className="self-start mt-6 mb-17">
        <h2 className="text-lg font-bold mb-2">
          <span className="text-[#FFD735]">|</span> 신규 돈쭐 가게
        </h2>
        {visibleNew.map(store => (
          <StoreCard key={store.id} store={store} router={router} />
        ))}
        {!showAllNew && newStores.length > 3 && (
          <button
            onClick={() => setShowAllNew(true)}
            className="text-center w-full mt-2 text-black font-bold"
          >
            더보기
          </button>
        )}
      </section>
    </div>
  )
}

// ✅ 공통 카드 컴포넌트
function StoreCard({ store, router }: { store: Store; router: any }) {
  return (
    <div className="flex items-center mb-4">
      <div className="w-[70px] h-[70px] relative rounded-lg overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${store.image}`}
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
        className="ml-4 bg-[#FFD735] text-sm px-5 py-2 rounded-full"
        onClick={() => router.push(`/store/${store.id}`)}
      >
        more
      </button>
    </div>
  )
}
