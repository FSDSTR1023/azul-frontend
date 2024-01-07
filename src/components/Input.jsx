export const Input = ({ label, placeholder, type, name, register }) => {
    // console.log(errors)
    // if (errors !== undefined) {
    //     console.log(errors[type])
    // }
    return (
        <div className="w-full text-left">
            <label className="text-slate-600">{label}</label>
            <input
                className="w-full border border-slate-300 py-2 px-4 rounded"
                name={name}
                type={type}
                placeholder={placeholder}
                // ref={ref}
                {...register}
            />
            {/* {errors && errors[type].message && <span className="text-red-500">{errors[type].message}</span>} */}
        </div>
    )
}
