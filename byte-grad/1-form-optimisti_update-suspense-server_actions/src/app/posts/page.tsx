import { sleep } from '@/app/utils/sleeep'
import Users from '@/componsnts/Users'

export async function Posts() {
  await sleep(2000)

  const response = await fetch('http://localhost:3000/api/users')
  const users = (await response.json()) as { id: number; name: string }[]

  return (
    <div>
      <h3>my todos</h3>
      <Users users={users} />
    </div>
  )
}

export default Posts
