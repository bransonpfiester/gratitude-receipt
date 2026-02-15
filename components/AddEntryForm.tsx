'use client';

import { useState } from 'react';

interface AddEntryFormProps {
  onAdd: (text: string) => void;
}

export default function AddEntryForm({ onAdd }: AddEntryFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="sticky top-0 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 backdrop-blur-sm p-4 md:p-6 shadow-lg z-10 border-b border-gray-200">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl font-mono text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-sm hover:shadow-md"
              placeholder="I'm grateful for..."
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
          >
            Add
          </button>
        </form>
        
        {/* Subtle helper text */}
        <p className="text-xs text-gray-500 text-center mt-3 font-mono">
          ✦ Press Enter or tap Add to save ✦
        </p>
      </div>
    </div>
  );
}
