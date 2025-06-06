'use client'

import { useEffect, useState, Suspense } from 'react' // Suspense 추가
import Image from 'next/image'
import { useRouter, useSearchParams} from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import Header from '@/components/Header'
import BottomTab from '@/components/BottomTab'
import PointModal from '@/components/modals/PointModal'

// 1. 컴포넌트 바깥(상단)에 타입 정의
interface Store {
  id: number;
  name: string;
  address: string;
  description: string;
  image?: string;
  // ...필요 필드
}

// 기존 WriteReviewPage 내용을 새 컴포넌트로 이동
function ClientReviewPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const businessNumber = searchParams.get('bno');
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(4)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 사업자번호로 가게정보 패칭
  useEffect(() => {
    if (!businessNumber) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${businessNumber}`)
      .then(res => res.ok ? res.json() : Promise.reject('가게 정보 없음'))
      .then(data => {
        setStore(data);
        setLoading(false);
      })
      .catch(err => {
        alert('가게 정보를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, [businessNumber]);

  const handleSubmit = async () => {
    if (!review || rating === 0) {
      alert('별점과 리뷰를 입력해주세요!');
      return;
    }
    const userId = 1;   // 실제 id로 교체
    const storeId = 1;  // 실제 id로 교체
    const payload = { userId, storeId, rating, content: review };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsModalOpen(true);
      } else {
        alert('리뷰 등록에 실패했습니다.');
      }
    } catch (err) {
      alert('서버 오류');
      console.error(err);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!store) return <div>가게 정보를 불러올 수 없습니다.</div>;

  return (
    <>
      <Header />

      {/* ✅ 스크롤 콘텐츠 영역 */}
      <main className="min-h-screen bg-[#FFD735]/85 px-4 py-6 flex flex-col items-center rounded-[50px]">
        <div className="bg-white rounded-[40px] w-full max-w-md p-4 pb-20 shadow-md relative">
          {/* 이미지 + 닫기 */}
          <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative">
            {store.image ? (
              <Image src={`http://localhost:8080/images/${store.image}`} alt="가게 이미지" fill unoptimized className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">이미지 없음</div>
            )}
            <button
              onClick={() => router.back()}
              className="absolute top-2 right-2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* 가게 정보 */}
          <div className="mb-6">
            <p className="border-l-4 border-yellow-400 pl-2 font-bold text-gray-800 mb-1">
              인식된 가게 정보
            </p>
            <div className="relative border border-gray-300 border-dashed rounded-xl p-4 pt-8 text-center mt-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E7E6E6] px-4 py-1 rounded-full shadow-sm">
                <p className="font-bold text-md text-gray-800">{store.name}</p>
              </div>
              <p className="text-left text-sm text-gray-600">{store.address}</p>
              <p className="text-left text-sm text-gray-600">{store.description}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <p>전화번호 : 031-426-4790</p>
                <p className="text-blue-500">⭐ 4.5</p>
              </div>
            </div>
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-between mb-6">
            <button
              className="w-[48%] bg-[#E7E6E6]/70 rounded-full py-2 font-semibold"
              onClick={() => router.push('/camera')}
            >
              아니에요
            </button>
            <button
              className="w-[48%] bg-[#E7E6E6]/70 rounded-full py-2 font-semibold"
              onClick={() => console.log('맞아요 클릭됨')}
            >
              맞아요
            </button>
          </div>

          {/* 리뷰 작성 */}
          <div>
            <p className="border-l-4 border-yellow-400 pl-2 font-bold text-gray-800 mb-3">
              리뷰 작성하기
            </p>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={`w-6 h-6 cursor-pointer ${
                    i <= (hoverRating || rating) ? 'text-orange-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <textarea
              className="w-full border border-[#D9D9DE] rounded-md p-3 h-28 resize-none text-sm"
              placeholder="구매하신 상품/서비스는 만족스러우셨나요?"
              maxLength={500}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <p className="text-right text-xs text-gray-400 mt-1">{review.length}/500</p>
          </div>
          {/* ✅ 등록 버튼: 고정 (하단탭 위) */}
          <div className="mt-15">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#FFC300] text-white font-bold py-4 rounded-full shadow-lg"
            >
              등록하기
            </button>
          </div>
        </div>
      </main>

      {/* ✅ 하단탭 */}
      <BottomTab />

      {/* ✅ 모달 */}
      <PointModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        router.push('/main');
        }} />
    </>
  )
}

// Suspense로 감싸서 export
export default function WriteReviewPage() {
    return (
        <Suspense fallback={<div>페이지를 로딩 중입니다...</div>}> {/* fallback은 로딩 중 표시될 내용 */}
            <ClientReviewPageContent />
        </Suspense>
    )
}