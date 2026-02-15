import { ReceiptState, GratitudeEntry } from './types';

const STORAGE_KEY = 'gratitude-receipt-data';

export const getReceiptState = (): ReceiptState => {
  if (typeof window === 'undefined') {
    return { entries: [] };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { entries: [] };
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load receipt state:', error);
    return { entries: [] };
  }
};

export const saveReceiptState = (state: ReceiptState): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save receipt state:', error);
  }
};

export const addEntry = (text: string): ReceiptState => {
  const state = getReceiptState();
  const now = new Date();
  
  const newEntry: GratitudeEntry = {
    id: crypto.randomUUID(),
    text,
    timestamp: now.getTime(),
    date: now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
  };
  
  const newState = {
    entries: [...state.entries, newEntry],
  };
  
  saveReceiptState(newState);
  return newState;
};

export const clearAllEntries = (): ReceiptState => {
  const newState = { entries: [] };
  saveReceiptState(newState);
  return newState;
};
