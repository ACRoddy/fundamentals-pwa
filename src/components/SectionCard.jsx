export default function SectionCard({ label, sublabel, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FFCC00] text-black font-bold rounded-2xl px-5 py-4 text-left flex items-center justify-between active:scale-98 active:opacity-90 transition-transform"
    >
      <div>
        <div className="text-base">{label}</div>
        {sublabel && <div className="text-xs font-normal opacity-60 mt-0.5">{sublabel}</div>}
      </div>
      {accent && (
        <span className="text-xs bg-black/10 rounded-full px-2 py-0.5 font-semibold">{accent}</span>
      )}
      <span className="text-xl opacity-50 ml-2">›</span>
    </button>
  )
}
