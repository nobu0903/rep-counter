import { useState } from 'react'
import { useWorkoutStore } from '../store/useWorkoutStore'
// import type { WorkoutState } from '../store/useWorkoutStore'

const AddExerciseForm = () => {
  const [exerciseName, setExerciseName] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const addExercise = useWorkoutStore((state) => state.addExercise)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (exerciseName.trim()) {
      addExercise(selectedSection, exerciseName.trim())
      setExerciseName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <select
        value={selectedSection}
        onChange={(e) => setSelectedSection(e.target.value)}
        className="border rounded px-3 py-1"
        required
      >
        <option value="">部位を選択</option>
        {useWorkoutStore.getState().sections.map((sec) => (
          <option key={sec.name} value={sec.name}>{sec.name}</option>
        ))}
      </select>
      <input
        type="text"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
        placeholder="例: ベンチプレス"
        className="border rounded px-3 py-1"
      />
      <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
        種目追加
      </button>
    </form>
  )
}

export default AddExerciseForm 