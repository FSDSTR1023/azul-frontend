import { Link } from 'react-router-dom'

export const CustomLink = ({ children, to }) => {
    return (
        <Link className="py-2 px-3 hover:bg-[#f7f7f5] rounded-md flex gap-4 items-center" to={to}>
            {children}
        </Link>
    )
}
