import { useState } from 'react';
import { useWorkoutStore } from '../store/useWorkoutStore';
import ExerciseRecordModal from './ExerciseRecordModal';

const SectionCard = () => {
  const sections = useWorkoutStore((state) => state.sections);
  const addExercise = useWorkoutStore((state) => state.addExercise);
  const [addingExercise, setAddingExercise] = useState<string | null>(null);
  const [newExerciseName, setNewExerciseName] = useState('');
  // モーダル用の状態
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{section: string, exercise: string} | null>(null);

  const handleAddExercise = (sectionName: string) => {
    if (newExerciseName.trim()) {
      addExercise(sectionName, newExerciseName.trim());
      setNewExerciseName('');
      setAddingExercise(null);
    }
  };

  // 種目クリック時のハンドラ
  const handleExerciseClick = (sectionName: string, exerciseName: string) => {
    console.log('Clicked:', sectionName, exerciseName);
    setSelectedExercise({ section: sectionName, exercise: exerciseName });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-md mx-auto">
      {sections.map((section) => (
        <div key={section.name} className="bg-white rounded-2xl shadow border border-gray-200">
          {/* ヘッダー */}
          <div className="bg-red-600 rounded-t-2xl px-4 py-2 flex items-center text-white font-bold text-lg">
            {section.name}
            <span className="ml-2 font-normal text-xs text-gray-100">
              (Previously: {section.lastDate || '記録なし'})
            </span>
          </div>
          {/* 種目リスト */}
          <div className="px-4 py-2">
            {section.exercises.map((ex) => (
              <button
                key={ex.name}
                className="py-2 border-b last:border-b-0 text-base text-gray-900 text-left w-full hover:bg-gray-100"
                onClick={() => handleExerciseClick(section.name, ex.name)}
              >
                {ex.name}
              </button>
            ))}
            <div className="flex justify-between items-center text-gray-400 py-2">
              {addingExercise === section.name ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                    placeholder="種目名を入力"
                    className="border rounded px-2 py-1 text-sm"
                    autoFocus
                  />
                  <button
                    onClick={() => handleAddExercise(section.name)}
                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    追加
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingExercise(section.name)}
                  className="text-sm hover:underline"
                >
                  Add
                </button>
              )}
              <button className="text-sm hover:underline">More</button>
            </div>
          </div>
        </div>
      ))}
      {/* モーダル呼び出し部分 */}
      <ExerciseRecordModal
        open={modalOpen}
        onClose={handleCloseModal}
        exerciseName={selectedExercise?.exercise || ''}
        sectionName={selectedExercise?.section || ''}
      />
    </div>
  );
};

export default SectionCard; 