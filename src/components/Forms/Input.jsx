import { Label } from './Label'

export const Input = ({ label, placeholder, type, name, register, value, errors }) => {
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
        value={value}
                // ref={ref}
        {...register}
      />
      {errors && errors[name] && <span className='text-red-500'>{errors[name].message}</span>}
    </div>
  )
}
