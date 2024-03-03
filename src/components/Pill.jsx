export const Pill = ({ children, color, extraClassName }) => {
  return (
    <span style={{ backgroundColor: color }} className={`py-2 px-3 rounded-full font-semibold text-black whitespace-nowrap w-max ${extraClassName}`}>{children}</span>
  )
}
