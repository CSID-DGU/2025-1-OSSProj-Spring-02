// store/characterStore.ts
import { create } from 'zustand'
import axios from 'axios'

type ActivityType = 'meal' | 'exercise' | 'sleep'

interface CharacterState {
  name: string
  points: number
  activityCount: Record<ActivityType, number>
  status: 'idle' | 'hungry' | 'tired' | 'bored'
  updateActivity: (userId: number, type: ActivityType) => void
  resetActivities: () => void
  addPoints: (userId: number, pt: number) => Promise<void>
  fetchPoints: (userId: number) => Promise<void>
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  name: '햄쥐',
  points: 0,
  activityCount: { meal: 0, exercise: 0, sleep: 0 },
  status: 'idle',

  // 초기 포인트 로드
  fetchPoints: async (userId) => {
    const res = await axios.get(`/api/users/${userId}/points`)
    set({ points: res.data.points })
  },

  // 포인트 추가
  addPoints: async (userId, pt) => {
    const res = await axios.post(`/api/users/${userId}/points`, { delta: pt })
    set({ points: res.data.updatedPoints })
  },

  updateActivity: async (userId, type) => {
    const { activityCount } = get()
    const current = activityCount[type]
    if (current >= 3) return

    // 상태 갱신
    set((state) => ({
      activityCount: {
        ...state.activityCount,
        [type]: current + 1,
      },
      status:
        type === 'meal'
          ? 'idle'
          : type === 'exercise'
          ? 'tired'
          : 'bored',
    }))

    // 백엔드 포인트 증가
    await get().addPoints(userId, 10)
  },

  resetActivities: () =>
    set(() => ({
      activityCount: { meal: 0, exercise: 0, sleep: 0 },
      status: 'idle',
    })),
}))

