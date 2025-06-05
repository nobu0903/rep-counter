import { create } from 'zustand'

type Record = {
  date: string
  reps: number
  weight: number
}

type Exercise = {
  name: string
  records: Record[]
}

type Section = {
  name: string
  lastDate: string // 前回日付（自動計算も可）
  exercises: Exercise[]
}

type Store = {
  sections: Section[]
  addSection: (name: string) => void
  addExercise: (sectionName: string, exerciseName: string) => void
  addRecord: (sectionName: string, exerciseName: string, record: Record) => void
}

export const useWorkoutStore = create<Store>((set) => ({
  sections: [
    { name: 'Chest', lastDate: '', exercises: [] },
    { name: 'Back', lastDate: '', exercises: [] },
    { name: 'Leg', lastDate: '', exercises: [] },
    { name: 'Shoulder', lastDate: '', exercises: [] },
    { name: 'Arm', lastDate: '', exercises: [] },
  ],
  addSection: (name) =>
    set((state) => {
      if (state.sections.some((sec) => sec.name === name)) return state
      return {
        sections: [...state.sections, { name, lastDate: '', exercises: [] }],
      }
    }),
  addExercise: (sectionName, exerciseName) =>
    set((state) => ({
      sections: state.sections.map((sec) =>
        sec.name === sectionName
          ? sec.exercises.some((ex) => ex.name === exerciseName)
            ? sec
            : { ...sec, exercises: [...sec.exercises, { name: exerciseName, records: [] }] }
          : sec
      ),
    })),
  addRecord: (sectionName, exerciseName, record) =>
    set((state) => ({
      sections: state.sections.map((sec) =>
        sec.name === sectionName
          ? {
              ...sec,
              exercises: sec.exercises.map((ex) =>
                ex.name === exerciseName
                  ? { ...ex, records: [...ex.records, record] }
                  : ex
              ),
              lastDate: record.date, // 最後に記録した日付を更新
            }
          : sec
      ),
    })),
}))