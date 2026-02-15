export default function ReceiptHeader() {
  return (
    <div className="text-center py-6 border-b-2 border-dashed border-gray-400">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Gratitude Receipt
      </h1>
      <p className="text-sm text-gray-600 font-mono">Daily Journal of Thanks</p>
      <p className="text-xs text-gray-500 font-mono mt-2">
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
}
