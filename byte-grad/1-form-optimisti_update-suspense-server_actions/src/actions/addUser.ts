'use server'

import { sleep } from '@/app/utils/sleeep'
// import { revalidatePath } from 'next/cache'
import users from '@/app/api/users/data.json'
import { userSchema } from '@/lib/zodSchemas'

export async function addUser(newUser: unknown) {
  await sleep(1500)

  const result = userSchema.safeParse(newUser)

  if (!result.success)
    return {
      error: result.error.issues.reduce(
        (acc, issue) => `${acc}${issue.path[0]}: ${issue.message}. `,
        '',
      ),
    }

  users.push({ id: users.length + 1, name: result.data.name })

  // revalidatePath('/posts')
}
