import { headers, cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import data from './mockData.json'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('q') || ''
  const filteredUsers = data.users.filter((user) => user.name.includes(query))

  const headerList = headers()
  const token = headerList.get('Authorization')

  const cookieList = cookies()
  const theme = cookieList.get('theme')
  cookieList.set('theme', 'dark', { httpOnly: true, secure: true })

  return Response.json({ users: filteredUsers, token, theme })
}

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  const newUser = { id: data.users.length + 1, name }
  data.users.push(newUser)

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
