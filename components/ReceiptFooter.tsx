interface ReceiptFooterProps {
  totalEntries: number;
}

export default function ReceiptFooter({ totalEntries }: ReceiptFooterProps) {
  return (
    <div className="text-center py-8 border-t-2 border-dashed border-gray-400">
      <p className="text-lg font-mono text-gray-700 mb-3">
        TOTAL ITEMS: {totalEntries}
      </p>
      <p className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Thank You
      </p>
      <p className="text-xs text-gray-500 font-mono">
        Keep counting your blessings
      </p>
      <div className="mt-6">
        <p className="text-xs text-gray-400 font-mono">
          ********************************
        </p>
      </div>
    </div>
  );
}
