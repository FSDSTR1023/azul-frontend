export const Button = ({ className, type, text, onClick }) => {
    const addClass = className ? className : ''
    return (
        <button
            className={addClass + ' py-2 px-4 text-white bg-slate-800 hover:bg-slate-600 rounded transition '}
            type={type ? type : 'button'}
            onClick={onClick}
        >
            {text}
        </button>
    )
}