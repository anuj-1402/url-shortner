export default function Input({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '',
  required = false,
  ...props 
}) {
  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${className}`;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        {...props}
      />
    </div>
  );
}
