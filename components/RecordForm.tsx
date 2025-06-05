// src/components/RecordForm.tsx
import { useState } from 'react'
import { useWorkoutStore } from '../store/useWorkoutStore'

const RecordForm = () => {
  const { sections, addRecord } = useWorkoutStore()
  const [selectedSection, setSelectedSection] = useState('')
  const [selectedExercise, setSelectedExercise] = useState('')
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]
  })
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSection || !selectedExercise || !date || reps <= 0 || weight <= 0) return
    addRecord(selectedSection, selectedExercise, { date, reps, weight })
    setDate(new Date().toISOString().split('T')[0])
    setReps(0)
    setWeight(0)
  }

  // 選択した部位の種目リストを取得
  const exercises = sections.find(sec => sec.name === selectedSection)?.exercises || []

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      {/* 部位選択 */}
      <select
        value={selectedSection}
        onChange={(e) => {
          setSelectedSection(e.target.value)
          setSelectedExercise('') // 部位を変えたら種目もリセット
        }}
        className="border px-3 py-2 rounded"
      >
        <option value="">部位を選択</option>
        {sections.map((sec) => (
          <option key={sec.name} value={sec.name}>{sec.name}</option>
        ))}
      </select>
      {/* 種目選択 */}
      <select
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
        className="border px-3 py-2 rounded"
        disabled={!selectedSection}
      >
        <option value="">種目を選択</option>
        {exercises.map((ex) => (
          <option key={ex.name} value={ex.name}>{ex.name}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} placeholder="重量(kg)" className="block border px-3 py-2 rounded" />
      <input type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} placeholder="レップ数" className="block border px-3 py-2 rounded" />
      <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">記録追加</button>
    </form>
  )
}

export default RecordForm
