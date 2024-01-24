import { env } from '@/lib/env'

function Envs() {
  return (
    <div>
      {env.NEXT_PUBLIC_API_URL} - {env.MY_SECRET}
    </div>
  )
}

export default Envs
