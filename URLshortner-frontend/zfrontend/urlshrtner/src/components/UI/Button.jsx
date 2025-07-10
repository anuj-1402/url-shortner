export default function Button({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white focus:ring-blue-500',
    secondary: 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white focus:ring-purple-500',
    success: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white focus:ring-green-500'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3',
    full: 'w-full py-3 px-6'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
