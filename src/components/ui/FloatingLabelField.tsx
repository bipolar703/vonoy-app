import React, { InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';

interface FloatingLabelFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  success?: boolean;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  rows?: number;
}

const FloatingLabelField: React.FC<FloatingLabelFieldProps> = ({
  id,
  name,
  label,
  value,
  error,
  success,
  type = 'text',
  required = false,
  onChange,
  onBlur,
  textarea = false,
  rows = 4,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine label color
  let labelColor = 'text-gray-400';
  if (error) labelColor = 'text-red-500';
  else if (success) labelColor = 'text-[#3dd598]';

  // Determine border color
  let borderColor = 'border-white/20';
  if (error) borderColor = 'border-red-500';
  else if (success) borderColor = 'border-green-500';

  // Label floats if focused or has value
  const shouldFloat = isFocused || !!value;

  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          rows={rows}
          className={`peer w-full bg-white border ${borderColor} rounded-md px-3 py-3 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 resize-none`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          className={`peer w-full bg-white border ${borderColor} rounded-md px-3 py-3 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300`}
          autoComplete="off"
          {...rest}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 px-1 transition-all duration-200 z-10 pointer-events-none ${labelColor} ${shouldFloat ? 'top-[-1.1rem] text-xs font-medium bg-[rgba(20,30,40,0.85)]' : 'top-3 text-base text-gray-600'} `}
        style={{
          background: shouldFloat ? 'rgba(20,30,40,0.85)' : 'transparent',
        }}
      >
        {label}
      </label>
      {error && <span className="mt-1 text-xs text-red-500 block">{error}</span>}
    </div>
  );
};

export default FloatingLabelField;
