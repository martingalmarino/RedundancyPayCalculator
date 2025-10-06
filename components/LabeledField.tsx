interface LabeledFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  min?: number;
  step?: number;
  required?: boolean;
}

export default function LabeledField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  min,
  step,
  required = false,
}: LabeledFieldProps) {
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
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        step={step}
        className={`input-field ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
      />
      
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
