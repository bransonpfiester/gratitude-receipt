'use client';

import { useState, useEffect } from 'react';

interface Entry {
  date: string;
  grateful: string[];
  greatDay: string;
  affirmation: string;
}

interface DailyEntryProps {
  onStreakUpdate: (streak: number) => void;
}

export default function DailyEntry({ onStreakUpdate }: DailyEntryProps) {
  const today = new Date().toISOString().split('T')[0];
  const [grateful1, setGrateful1] = useState('');
  const [grateful2, setGrateful2] = useState('');
  const [grateful3, setGrateful3] = useState('');
  const [greatDay, setGreatDay] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load today's entry if it exists
    const entries = JSON.parse(localStorage.getItem('gratitude-entries') || '[]');
    const todayEntry = entries.find((e: Entry) => e.date === today);
    
    if (todayEntry) {
      setGrateful1(todayEntry.grateful[0] || '');
      setGrateful2(todayEntry.grateful[1] || '');
      setGrateful3(todayEntry.grateful[2] || '');
      setGreatDay(todayEntry.greatDay || '');
      setAffirmation(todayEntry.affirmation || '');
    }
  }, [today]);

  const handleSave = () => {
    const entries = JSON.parse(localStorage.getItem('gratitude-entries') || '[]');
    const filteredEntries = entries.filter((e: Entry) => e.date !== today);
    
    const newEntry: Entry = {
      date: today,
      grateful: [grateful1, grateful2, grateful3].filter(g => g.trim() !== ''),
      greatDay,
      affirmation
    };
    
    filteredEntries.push(newEntry);
    localStorage.setItem('gratitude-entries', JSON.stringify(filteredEntries));
    
    // Calculate streak
    const sortedEntries = filteredEntries
      .map((e: Entry) => e.date)
      .sort()
      .reverse();
    
    let streak = 0;
    let checkDate = new Date();
    
    for (const entryDate of sortedEntries) {
      const date = new Date(entryDate);
      const daysDiff = Math.floor((checkDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    localStorage.setItem('gratitude-streak', streak.toString());
    onStreakUpdate(streak);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Date Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
        <h2 className="text-2xl font-bold text-purple-900 text-center">
          {formatDate(today)}
        </h2>
      </div>

      {/* Grateful Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <span>🙏</span> I am grateful for...
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            value={grateful1}
            onChange={(e) => setGrateful1(e.target.value)}
            placeholder="First thing..."
            className="w-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl text-lg focus:outline-none focus:border-purple-300 transition-colors"
          />
          <input
            type="text"
            value={grateful2}
            onChange={(e) => setGrateful2(e.target.value)}
            placeholder="Second thing..."
            className="w-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl text-lg focus:outline-none focus:border-purple-300 transition-colors"
          />
          <input
            type="text"
            value={grateful3}
            onChange={(e) => setGrateful3(e.target.value)}
            placeholder="Third thing..."
            className="w-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl text-lg focus:outline-none focus:border-purple-300 transition-colors"
          />
        </div>
      </div>

      {/* Great Day Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
        <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <span>✨</span> What would make today great?
        </h3>
        <textarea
          value={greatDay}
          onChange={(e) => setGreatDay(e.target.value)}
          placeholder="Write what would make today amazing..."
          rows={4}
          className="w-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl text-lg focus:outline-none focus:border-purple-300 transition-colors resize-none"
        />
      </div>

      {/* Affirmation Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <span>💜</span> Daily affirmation
        </h3>
        <textarea
          value={affirmation}
          onChange={(e) => setAffirmation(e.target.value)}
          placeholder="I am..."
          rows={3}
          className="w-full p-4 bg-purple-50 border-2 border-purple-100 rounded-xl text-lg focus:outline-none focus:border-purple-300 transition-colors resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-full text-xl font-semibold transition-all ${
          saved
            ? 'bg-green-500 text-white'
            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {saved ? '✓ Saved!' : 'Save Entry'}
      </button>
    </div>
  );
}
