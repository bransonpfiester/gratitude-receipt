'use client';

import { useState, useEffect } from 'react';

interface Entry {
  date: string;
  grateful: string[];
  greatDay: string;
  affirmation: string;
}

export default function History() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('gratitude-entries') || '[]');
    const sorted = savedEntries.sort((a: Entry, b: Entry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(sorted);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (entries.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 rounded-3xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl text-purple-700">No entries yet</p>
          <p className="text-purple-500 mt-2">Start writing to see your history!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {entries.map((entry) => (
        <div key={entry.date} className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-4">
            {formatDate(entry.date)}
          </h3>
          
          {entry.grateful.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-purple-700 mb-2">🙏 Grateful for:</p>
              <ul className="space-y-1">
                {entry.grateful.map((item, idx) => (
                  <li key={idx} className="text-purple-900 pl-4">• {item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {entry.greatDay && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-purple-700 mb-2">✨ Great day:</p>
              <p className="text-purple-900 pl-4">{entry.greatDay}</p>
            </div>
          )}
          
          {entry.affirmation && (
            <div>
              <p className="text-sm font-semibold text-purple-700 mb-2">💜 Affirmation:</p>
              <p className="text-purple-900 pl-4 italic">{entry.affirmation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
