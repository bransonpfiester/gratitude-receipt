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
    <div className="sticky top-0 bg-amber-50 p-6 border-b-2 border-dashed border-gray-400 shadow-md z-10">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="I'm grateful for..."
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
}
