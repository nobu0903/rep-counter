import React, { useState, useEffect } from 'react';
import { useWorkoutStore } from '../store/useWorkoutStore';

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

const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const ExerciseRecordModal: React.FC<ExerciseRecordModalProps> = ({ open, onClose, exerciseName, sectionName }) => {
  const addRecord = useWorkoutStore((state) => state.addRecord);
  const [sets, setSets] = useState<SetRecord[]>([
    { weight: '', reps: '' },
    { weight: '', reps: '' },
    { weight: '', reps: '' },
  ]);
  const [date, setDate] = useState(getToday());

  // モーダルが開かれたときに入力欄をリセット
  useEffect(() => {
    if (open) {
      setSets([
        { weight: '', reps: '' },
        { weight: '', reps: '' },
        { weight: '', reps: '' },
      ]);
      setDate(getToday());
    }
  }, [open]);

  const handleSetChange = (idx: number, field: 'weight' | 'reps', value: string) => {
    setSets((prev) => prev.map((set, i) => i === idx ? { ...set, [field]: value } : set));
  };

  const handleAddSet = () => {
    setSets((prev) => [...prev, { weight: '', reps: '' }]);
  };

  const handleRemoveSet = (idx: number) => {
    setSets((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  const handleAddRecords = () => {
    sets.forEach((set) => {
      if (set.weight && set.reps) {
        addRecord(sectionName, exerciseName, {
          date,
          weight: Number(set.weight),
          reps: Number(set.reps),
        });
      }
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        background: 'rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
          padding: '2rem',
          maxWidth: '400px',
          minWidth: '300px',
          width: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 9999
        }}
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">{exerciseName}</h2>
        <div className="mb-4 w-full flex items-center gap-2">
          <label className="text-sm text-gray-300">日付:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-600 bg-black text-white rounded px-2 py-1 focus:outline-none focus:border-blue-400"
          />
        </div>
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
          <button onClick={handleAddRecords} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">記録追加</button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRecordModal; 