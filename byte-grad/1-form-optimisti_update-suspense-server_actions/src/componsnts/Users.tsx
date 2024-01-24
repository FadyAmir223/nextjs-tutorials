'use client'

import { Suspense, useOptimistic, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { addUser } from '@/actions/addUser'
import { type User, userSchema } from '@/lib/zodSchemas'

type UsersProps = {
  users: User[]
}

export default function Users({ users }: UsersProps) {
  const elForm = useRef<HTMLFormElement>(null)
  const [error, setError] = useState('')
  const { pending } = useFormStatus()

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser: User) => [...state, newUser],
  )

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name')
    const result = userSchema.safeParse({ name })

    if (!result.success)
      return setError(
        result.error.issues.reduce(
          (acc, issue) => `${acc}${issue.path[0]}: ${issue.message}. `,
          '',
        ),
      )

    addOptimisticUser({ id: Math.random(), name: result.data.name })

    elForm.current?.reset()
    const response = await addUser(result.data)

    if (response?.error) setError(response.error)
  }

  return (
    <>
      <form ref={elForm} action={handleSubmit}>
        <input type='text' name='name' id='name' placeholder='name' />
        <p>{error}</p>
        <button
          className='bg-blue-600 disabled:opacity-60 transition-opacity'
          disabled={pending}
        >
          submit
        </button>
      </form>

      <Suspense fallback={<div>loading users...</div>}>
        <ul>
          {optimisticUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </Suspense>
    </>
  )
}
