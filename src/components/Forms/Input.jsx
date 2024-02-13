import { Label } from './Label'

export const Input = ({ label, placeholder, type, name, register, ...others }) => {
  // console.log(errors)
  // if (errors !== undefined) {
  //     console.log(errors[type])
  // }
  return (
    <div className='w-full text-left'>
      <Label text={label} />
      <input
        className='w-full border border-slate-300 py-2 px-4 rounded'
        name={name}
        type={type}
        placeholder={placeholder}
        {...others}
        // ref={ref}
        {...register}
      />
      {/* {errors && errors[type].message && <span className="text-red-500">{errors[type].message}</span>} */}
    </div>
  )
}
