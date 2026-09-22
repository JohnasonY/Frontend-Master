import './StatisticsCard.css'

export default function StatisticsCard({ value, label, tone }) {
  return (
    <article className={`stat-card ${tone}`} id={tone === 'pink' ? 'insights' : undefined}>
      <div><strong>{value}</strong><p>{label}</p></div>
    </article>
  )
}
