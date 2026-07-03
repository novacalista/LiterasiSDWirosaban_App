export default function StatCard({ icon: Icon, value, label, iconBg = 'bg-primary-light', iconColor = 'text-primary' }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft p-3">
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center mb-2`}>
        <Icon size={16} className={iconColor} />
      </div>
      <p className="text-lg font-extrabold text-text-primary">{value}</p>
      <p className="text-[11px] text-text-secondary leading-4">{label}</p>
    </div>
  );
}
