export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-primary-light text-primary',
    success: 'bg-success-light text-success',
    warning: 'bg-warning-light text-[#92400E]',
    popular: 'bg-warning text-[#1E293B]',
    kelas: 'bg-success-light text-success',
    category: 'bg-primary-light text-primary',
    categoryActive: 'bg-primary text-white',
  };

  return (
    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-sm ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
