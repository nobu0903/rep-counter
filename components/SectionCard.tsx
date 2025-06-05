import React from 'react';

// ダミーデータ
const sections = [
  {
    name: 'Chest',
    lastDate: '3 days ago',
    exercises: ['Bench Press', 'Pec Fly', 'Chest Press'],
  },
  {
    name: 'Back',
    lastDate: '19 hours 41 minutes ago',
    exercises: ['Deadlift', 'Lat Pulldown', 'Pulley Row'],
  },
  {
    name: 'Leg',
    lastDate: '4 days ago',
    exercises: ['Squat', 'Smith Machine Barbell Squat', 'Leg Press'],
  },
  {
    name: 'Shoulder',
    lastDate: '19 hours 9 minutes ago',
    exercises: ['Side Raise', 'Shoulder Press'],
  },
  {
    name: 'Arm',
    lastDate: '2 days ago',
    exercises: ['Biceps Curl', 'Triceps Extension'],
  },
];

const SectionCard = () => {
  return (
    <div className="flex flex-col gap-6 p-4 max-w-md mx-auto">
      {sections.map((section) => (
        <div key={section.name} className="bg-white rounded-2xl shadow border border-gray-200">
          {/* ヘッダー */}
          <div className="bg-red-600 rounded-t-2xl px-4 py-2 flex items-center text-white font-bold text-lg">
            {section.name}
            <span className="ml-2 font-normal text-xs text-gray-100">(Previously: {section.lastDate})</span>
          </div>
          {/* 種目リスト */}
          <div className="px-4 py-2">
            {section.exercises.map((ex) => (
              <div key={ex} className="py-2 border-b last:border-b-0 text-base text-gray-900">{ex}</div>
            ))}
            <div className="flex justify-between items-center text-gray-400 py-2">
              <button className="text-sm hover:underline">Add</button>
              <button className="text-sm hover:underline">More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionCard; 