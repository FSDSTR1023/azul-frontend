export const Button = ({ className, type, onClick, children, variant = 'primary', disabled }) => {
  const addedClass = className || ''
  const variantClasses = {
    primary: 'bg-slate-800 hover:bg-slate-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-200 text-black',
    outline: 'bg-transparent hover:bg-slate-200 text-black border border-slate-200',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
    disabled: 'text-gray-400/60 cursor-not-allowed'
  }
  return (
    <button
      className={`${addedClass} ${variantClasses[variant]} py-2 px-3 rounded transition text-sm flex gap-1 items-center justify-center`}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
