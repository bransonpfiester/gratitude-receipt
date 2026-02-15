'use client';

import { useEffect, useState } from 'react';
import { ReceiptState } from '@/lib/types';
import { getReceiptState, addEntry, clearAllEntries } from '@/lib/storage';

export default function Home() {
  const [state, setState] = useState<ReceiptState>({ entries: [] });
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setState(getReceiptState());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newState = addEntry(inputText.trim());
      setState(newState);
      setInputText('');
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all entries?')) {
      setState(clearAllEntries());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Daily Gratitude
          </h1>
          <p className="text-gray-500">What are you grateful for today?</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAdd} className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="I'm grateful for..."
              className="w-full text-lg px-2 py-2 outline-none text-gray-800 placeholder:text-gray-400"
              autoFocus
            />
            <button
              type="submit"
              className="mt-3 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 rounded-xl transition-all active:scale-95"
            >
              Add Entry
            </button>
          </div>
        </form>

        {/* Stats */}
        {state.entries.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Entries</p>
            <p className="text-4xl font-bold text-pink-500">{state.entries.length}</p>
          </div>
        )}

        {/* Entries List */}
        {state.entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-gray-400">No entries yet</p>
            <p className="text-gray-400 text-sm">Start your gratitude journey above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {state.entries.slice().reverse().map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800 text-lg mb-2">{entry.text}</p>
                <p className="text-xs text-gray-400">{entry.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* Clear Button */}
        {state.entries.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear all entries
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
