export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        )}
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={props.rows || 2}
            className={`w-full px-3 py-2 rounded-md border text-sm outline-none transition-all resize-none ${
              error ? 'border-danger' : 'border-border'
            } bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/12 ${Icon ? 'pl-9' : ''} ${className}`}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-[42px] px-3 rounded-md border text-sm outline-none transition-all ${
              error ? 'border-danger' : 'border-border'
            } bg-surface text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-[3px] focus:ring-primary/12 ${Icon ? 'pl-9' : ''} ${className}`}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-[11px] text-danger mt-1">{error}</p>}
    </div>
  );
}
