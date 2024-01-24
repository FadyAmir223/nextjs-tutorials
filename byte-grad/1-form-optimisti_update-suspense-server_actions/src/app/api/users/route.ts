import users from './data.json'

export async function GET() {
  return Response.json(users)
}

export async function POST(request: Request) {
  const { name } = await request.json()
  const newUser = { id: users.length + 1, name }
  users.push(newUser)
  return Response.json({ user: newUser })
}
