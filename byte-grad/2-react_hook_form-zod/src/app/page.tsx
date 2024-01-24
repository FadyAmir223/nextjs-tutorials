'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, type LoginFormSchema } from '@/lib/validations'

export function Home() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema) })

  const onSubmit = async (formData: LoginFormSchema) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const data = await response.json()

      if (data.errors)
        Object.entries(data.errors).forEach(([key, value]) =>
          setError(key as keyof LoginFormSchema, { message: value as string }),
        )

      return
    }

    reset()
  }

  return (
    <div className='mx-auto py-4 max-w-sm'>
      <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type='email'
            className='px-4 py-2 rounded w-full'
            placeholder='email'
            {...register('email')}
          />
          <p className='text-red-600'>{errors.email?.message}</p>
        </div>

        <div>
          <input
            type='password'
            className='px-4 py-2 rounded w-full'
            placeholder='password'
            {...register('password')}
          />
          <p className='text-red-600'>{errors.password?.message}</p>
        </div>

        <div>
          <input
            type='password'
            className='px-4 py-2 rounded w-full'
            placeholder='confirm Password'
            {...register('confirmPassword')}
          />
          <p className='text-red-600'>{errors.confirmPassword?.message}</p>
        </div>
        <button
          className='px-4 py-2 rounded bg-blue-500 disabled:bg-blue-300'
          disabled={isSubmitting}
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default Home
