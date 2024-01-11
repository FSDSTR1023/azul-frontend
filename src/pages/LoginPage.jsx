import { useForm } from 'react-hook-form'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router'

export const LoginPage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm()
    const { signin, isAuthenticated } = useAuth()
    if (isAuthenticated) return <Navigate to="/dashboard" replace />
    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        signin(data)
    })
    return (
        <div className="w-full bg-white p-5 max-w-xl rounded">
            <p className="text-left text-slate-400">Entra tus datos para realizar el login</p>
            <form onSubmit={onSubmit} className="flex flex-col items-start mt-3 gap-3">
                <Input
                    label="Email"
                    placeholder="johndoe@doe.com"
                    type="text"
                    errors={errors}
                    name="email"
                    register={register('email', { required: 'El email es requerido' })}
                />
                <Input
                    label="Contraseña"
                    placeholder="Contraseña"
                    type="password"
                    errors={errors}
                    register={register('password', { required: 'La contraseña es requerida' })}
                />
                <Button className={'mt-2'} type="submit" text="Iniciar sesión" />
            </form>
        </div>
    )
}
