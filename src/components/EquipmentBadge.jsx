const icons = {
  'cones': '🔺',
  'small dome cones': '🔸',
  'dome cones': '🔸',
  'football': '⚽',
  'footballs': '⚽',
  'markers': '🟡',
  'bibs': '🦺',
  'giant ball': '🔵',
  'parachute': '🌈',
  'hoops': '⭕',
  'balls': '🏐',
}

export default function EquipmentBadge({ item }) {
  const icon = icons[item?.toLowerCase()] ?? '📦'
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm font-medium rounded-full px-3 py-1">
      <span>{icon}</span>
      <span>{item}</span>
    </span>
  )
}
