import { GratitudeEntry } from '@/lib/types';

interface ReceiptEntryProps {
  entry: GratitudeEntry;
  index: number;
}

export default function ReceiptEntry({ entry, index }: ReceiptEntryProps) {
  return (
    <div className="py-2.5 border-b border-gray-200 hover:bg-gray-50/50 transition-colors duration-150">
      <div className="font-mono text-sm leading-relaxed">
        <div className="flex items-start gap-3">
          <span className="text-gray-400 font-medium flex-shrink-0 text-xs mt-0.5">
            {String(index + 1).padStart(3, '0')}.
          </span>
          <span className="text-gray-800 flex-1">
            {entry.text}
          </span>
        </div>
      </div>
      <div className="text-[10px] text-gray-400 font-mono mt-1.5 text-right tracking-wider">
        {entry.date}
      </div>
    </div>
  );
}
