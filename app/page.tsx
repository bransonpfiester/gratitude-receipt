'use client';

import { useState, useEffect } from 'react';
import DailyEntry from '@/components/DailyEntry';
import History from '@/components/History';

export default function Home() {
  const [view, setView] = useState<'today' | 'history'>('today');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load streak from localStorage
    const savedStreak = localStorage.getItem('gratitude-streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-purple-200 to-pink-200">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">✨ Gratitude Journal</h1>
        <div className="flex justify-center items-center gap-2 text-purple-700">
          <span className="text-2xl">🔥</span>
          <span className="text-lg font-semibold">{streak} day streak</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 px-6 mb-6">
        <button
          onClick={() => setView('today')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            view === 'today'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-white/50 text-purple-600 hover:bg-white/70'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setView('history')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            view === 'history'
              ? 'bg-white text-purple-700 shadow-lg'
              : 'bg-white/50 text-purple-600 hover:bg-white/70'
          }`}
        >
          History
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-8">
        {view === 'today' ? (
          <DailyEntry onStreakUpdate={setStreak} />
        ) : (
          <History />
        )}
      </div>
    </div>
  );
}
