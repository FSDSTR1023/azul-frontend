export const Pill = ({ children, color }) => {
  return (
    <span style={{ backgroundColor: color }} className='py-2 px-3 rounded-full font-semibold text-black whitespace-nowrap'>{children}</span>
  )
}
