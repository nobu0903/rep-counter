// src/components/RecordList.tsx
import { useWorkoutStore } from '../store/useWorkoutStore'

const RecordList = () => {
  const sections = useWorkoutStore((state) => state.sections)

  return (
    <div>
      {sections.map((section) => (
        <div key={section.name} className="mb-8">
          <h2 className="font-bold text-lg mb-2">{section.name}</h2>
          {section.exercises.length === 0 ? (
            <p className="text-gray-500 ml-4">種目なし</p>
          ) : (
            section.exercises.map((ex) => (
              <div key={ex.name} className="mb-4 ml-4">
                <h3 className="font-semibold">{ex.name}</h3>
                {ex.records.length === 0 ? (
                  <p className="text-gray-400 ml-4">記録なし</p>
                ) : (
                  <ul className="list-disc pl-8">
                    {[...ex.records]
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((rec, i) => (
                        <li key={i}>
                          {rec.date} - {rec.weight}kg x {rec.reps}回
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}

export default RecordList
