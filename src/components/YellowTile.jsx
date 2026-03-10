export default function YellowTile({ label, sublabel, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`
        bg-[#FFCC00] text-black font-bold rounded-2xl
        flex flex-col items-center justify-center
        text-center leading-tight
        active:scale-95 transition-transform
        ${disabled ? 'opacity-40 cursor-default' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="text-base">{label}</span>
      {sublabel && <span className="text-xs font-normal mt-0.5 opacity-70">{sublabel}</span>}
    </button>
  )
}
