const icons = {
  'Cones': '🔺',
  'Football': '⚽',
  'Markers': '🟡',
  'Bibs': '🦺',
  'Giant Ball': '🔵',
  'Parachute': '🌈',
  'Hoops': '⭕',
  'Balls': '🏐',
}

export default function EquipmentBadge({ item }) {
  const icon = icons[item] ?? '📦'
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm font-medium rounded-full px-3 py-1">
      <span>{icon}</span>
      <span>{item}</span>
    </span>
  )
}
