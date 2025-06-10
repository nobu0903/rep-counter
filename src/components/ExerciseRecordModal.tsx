import React, { useState } from 'react';

interface SetRecord {
  weight: string;
  reps: string;
}

interface ExerciseRecordModalProps {
  open: boolean;
  onClose: () => void;
  exerciseName: string;
  sectionName: string;
}

const ExerciseRecordModal: React.FC<ExerciseRecordModalProps> = ({ open, onClose, exerciseName }) => {
  const [sets, setSets] = useState<SetRecord[]>([
    { weight: '', reps: '' },
    { weight: '', reps: '' },
    { weight: '', reps: '' },
  ]);

  const handleSetChange = (idx: number, field: 'weight' | 'reps', value: string) => {
    setSets((prev) => prev.map((set, i) => i === idx ? { ...set, [field]: value } : set));
  };

  const handleAddSet = () => {
    setSets((prev) => [...prev, { weight: '', reps: '' }]);
  };

  const handleRemoveSet = (idx: number) => {
    setSets((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="bg-black text-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center"
        style={{ backgroundColor: '#000', color: '#fff' }}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">{exerciseName}</h2>
        <div className="space-y-4 w-full">
          {sets.map((set, idx) => (
            <div key={idx} className="flex items-center gap-2 w-full">
              <span className="text-gray-300 w-16 text-sm">{idx + 1}セット目</span>
              <input
                type="number"
                placeholder="重量(kg)"
                value={set.weight}
                onChange={e => handleSetChange(idx, 'weight', e.target.value)}
                className="border border-gray-600 bg-black text-white rounded px-2 py-1 w-20 focus:outline-none focus:border-blue-400"
                min="0"
              />
              <span className="text-gray-300">kg</span>
              <input
                type="number"
                placeholder="回数"
                value={set.reps}
                onChange={e => handleSetChange(idx, 'reps', e.target.value)}
                className="border border-gray-600 bg-black text-white rounded px-2 py-1 w-16 focus:outline-none focus:border-blue-400"
                min="0"
              />
              <span className="text-gray-300">回</span>
              <button onClick={() => handleRemoveSet(idx)} className="text-red-400 hover:underline text-xs">削除</button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8 w-full">
          <button onClick={handleAddSet} className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm">＋セット追加</button>
          <button onClick={onClose} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">記録する（仮）</button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRecordModal; 