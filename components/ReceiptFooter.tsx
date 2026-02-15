interface ReceiptFooterProps {
  totalEntries: number;
}

export default function ReceiptFooter({ totalEntries }: ReceiptFooterProps) {
  return (
    <div className="text-center py-8 mt-4">
      {/* Separator line */}
      <div className="mb-6">
        <p className="text-xs text-gray-300 font-mono tracking-widest">
          ═══════════════════════════
        </p>
      </div>

      {/* Total count */}
      <div className="mb-6">
        <p className="text-[10px] font-mono text-gray-400 tracking-widest mb-1">
          TOTAL ITEMS
        </p>
        <p className="text-3xl font-mono font-bold text-gray-700">
          {String(totalEntries).padStart(3, '0')}
        </p>
      </div>

      {/* Thank you message */}
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Thank You
        </p>
        <p className="text-xs text-gray-500 italic">
          Keep counting your blessings
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="space-y-1">
        <p className="text-xs text-gray-300 font-mono">
          ═══════════════════════════
        </p>
        <p className="text-[10px] text-gray-400 font-mono tracking-widest">
          ✦ GRATITUDE JOURNAL ✦
        </p>
      </div>
    </div>
  );
}
