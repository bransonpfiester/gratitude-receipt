export default function ReceiptHeader() {
  return (
    <div className="text-center pb-6 border-b border-gray-300 mb-1">
      {/* Store/Brand Name */}
      <div className="mb-4">
        <div className="text-xs font-mono text-gray-500 tracking-widest mb-1">
          ✦ DAILY GRATITUDE ✦
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}>
          Thank You
        </h1>
        <div className="text-xs font-mono text-gray-500 tracking-widest mt-1">
          ═══════════════════
        </div>
      </div>

      {/* Receipt Info */}
      <div className="space-y-0.5 font-mono text-xs text-gray-600">
        <p className="tracking-wider">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }).toUpperCase()}
        </p>
        <p className="text-gray-500">
          {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
}
