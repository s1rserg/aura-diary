interface StatCardProps {
  title: string;
  value: string | number | undefined;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="stat-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default StatCard;
