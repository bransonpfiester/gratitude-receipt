'use client';

import { useEffect, useState, useRef } from 'react';
import { ReceiptState } from '@/lib/types';
import { getReceiptState, addEntry, clearAllEntries } from '@/lib/storage';
import AddEntryForm from '@/components/AddEntryForm';
import ReceiptHeader from '@/components/ReceiptHeader';
import ReceiptEntry from '@/components/ReceiptEntry';
import ReceiptFooter from '@/components/ReceiptFooter';

export default function Home() {
  const [state, setState] = useState<ReceiptState>({ entries: [] });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState(getReceiptState());
  }, []);

  const handleAddEntry = (text: string) => {
    const newState = addEntry(text);
    setState(newState);
    
    // Auto-scroll to bottom after adding
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all entries?')) {
      const newState = clearAllEntries();
      setState(newState);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <AddEntryForm onAdd={handleAddEntry} />

      <div className="container mx-auto max-w-2xl">
        {/* Receipt Paper Container */}
        <div className="bg-white shadow-2xl min-h-screen" style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.02) 2px,
              rgba(0,0,0,0.02) 3px
            )
          `
        }}>
          <div className="px-8 py-6">
            <ReceiptHeader />

            {/* Entries List */}
            <div className="py-4">
              {state.entries.length === 0 ? (
                <div className="text-center py-12 text-gray-400 font-mono text-sm">
                  No entries yet. Start adding what you're grateful for!
                </div>
              ) : (
                state.entries.map((entry, index) => (
                  <ReceiptEntry key={entry.id} entry={entry} index={index} />
                ))
              )}
            </div>

            {state.entries.length > 0 && (
              <ReceiptFooter totalEntries={state.entries.length} />
            )}

            {/* Clear All Button (hidden at bottom) */}
            {state.entries.length > 0 && (
              <div className="text-center pb-8">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-400 hover:text-red-600 font-mono underline"
                >
                  Clear all entries
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
