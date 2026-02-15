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
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-red-50 p-4 md:p-8">
      <AddEntryForm onAdd={handleAddEntry} />

      <div className="container mx-auto max-w-2xl">
        {/* Receipt Paper Container with perforated edges */}
        <div 
          className="bg-gradient-to-b from-white to-gray-50 shadow-2xl min-h-screen relative"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 24px,
                rgba(200,200,200,0.1) 24px,
                rgba(200,200,200,0.1) 25px
              )
            `,
          }}
        >
          {/* Perforated edges */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-white opacity-90" style={{
            backgroundImage: 'radial-gradient(circle, transparent 40%, white 40%)',
            backgroundSize: '16px 8px',
            backgroundPosition: '0 -4px'
          }}/>
          
          <div className="px-6 md:px-12 py-8 pt-10">
            <ReceiptHeader />

            {/* Entries List */}
            <div className="py-6 space-y-3">
              {state.entries.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <p className="text-gray-400 font-mono text-sm mb-2">
                    ═══════════════════════════
                  </p>
                  <p className="text-gray-500 text-sm italic mb-2">
                    Your gratitude journal awaits
                  </p>
                  <p className="text-gray-400 font-mono text-sm">
                    ═══════════════════════════
                  </p>
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

            {/* Clear All Button */}
            {state.entries.length > 0 && (
              <div className="text-center py-8 border-t border-gray-200 mt-6">
                <button
                  onClick={handleClearAll}
                  className="text-xs text-gray-400 hover:text-red-500 font-mono transition-colors duration-200"
                >
                  [ clear all ]
                </button>
              </div>
            )}

            <div ref={bottomRef} className="h-8" />
          </div>

          {/* Bottom perforated edge */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-white opacity-90" style={{
            backgroundImage: 'radial-gradient(circle, transparent 40%, white 40%)',
            backgroundSize: '16px 8px',
            backgroundPosition: '0 4px'
          }}/>
        </div>
      </div>
    </div>
  );
}
