type StatCardProps = {
  title: string;
  value: string;
  icon: string;
  tone: 'purple' | 'blue' | 'orange' | 'red';
};

export function StatCard({ title, value, icon, tone }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__icon">
        <img src={icon} alt="" aria-hidden="true" />
      </div>
      <p>{title}</p>
      <strong>{value}</strong>
    </article>
  );
}
