import { create } from 'zustand'

type ActivityType = 'meal' | 'exercise' | 'sleep'

interface CharacterState {
  name: string
  points: number
  activityCount: Record<ActivityType, number>
  status: 'idle' | 'hungry' | 'tired' | 'bored'
  updateActivity: (type: ActivityType) => void
  resetActivities: () => void
  addPoints: (pt: number) => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
  name: '햄쥐',
  points: 0,
  activityCount: { meal: 0, exercise: 0, sleep: 0 },
  status: 'idle',
  updateActivity: (type) =>
    set((state) => {
      const current = state.activityCount[type]
      if (current >= 3) return state
      return {
        ...state,
        activityCount: {
          ...state.activityCount,
          [type]: current + 1,
        },
        points: state.points + 10,
        status:
          type === 'meal'
            ? 'idle'
            : type === 'exercise'
            ? 'tired'
            : 'bored',
      }
    }),
  resetActivities: () =>
    set(() => ({
      activityCount: { meal: 0, exercise: 0, sleep: 0 },
      status: 'idle',
    })),
  addPoints: (pt) => set((state) => ({ points: state.points + pt })),
}))
