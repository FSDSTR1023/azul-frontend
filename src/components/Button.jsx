export const Button = ({ className, type, onClick, children }) => {
  const addedClass = className || ''
  return (
    <button
      className={`${addedClass} py-2 px-4 text-white bg-slate-800 hover:bg-slate-600 rounded transition flex gap-4 items-center`}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
