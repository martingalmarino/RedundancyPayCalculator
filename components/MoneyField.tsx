interface MoneyFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
}

export default function MoneyField({
  label,
  id,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  required = false,
}: MoneyFieldProps) {
  const hasError = !!errorText;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-ink"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-inkMuted text-sm font-medium">EUR</span>
        </div>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`input-field pl-12 ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        />
      </div>
      
      {helperText && !hasError && (
        <p id={`${id}-helper`} className="text-xs text-inkMuted">
          {helperText}
        </p>
      )}
      
      {errorText && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {errorText}
        </p>
      )}
    </div>
  );
}
