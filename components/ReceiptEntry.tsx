import { GratitudeEntry } from '@/lib/types';

interface ReceiptEntryProps {
  entry: GratitudeEntry;
  index: number;
}

export default function ReceiptEntry({ entry, index }: ReceiptEntryProps) {
  return (
    <div className="py-3 border-b border-dashed border-gray-300">
      <div className="flex justify-between items-start font-mono text-sm">
        <div className="flex-1">
          <span className="text-gray-500 mr-3">#{String(index + 1).padStart(3, '0')}</span>
          <span className="text-gray-900">{entry.text}</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 font-mono mt-1 text-right">
        {entry.date}
      </div>
    </div>
  );
}
