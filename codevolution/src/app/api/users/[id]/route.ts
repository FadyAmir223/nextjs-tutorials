import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import data from '../mockData.json'

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } },
) {
  const id = +context.params.id
  if (id > data.users.length) redirect('/api/users')
  const user = data.users.filter((user) => user.id === id)
  return Response.json(user)
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = +context.params.id
  const { name } = await request.json()
  const index = data.users.findIndex((user) => id === user.id)
  const modifiedUser = { id, name }
  data.users[index] = modifiedUser
  return Response.json(modifiedUser)
}

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } },
) {
  const id = +context.params.id
  const index = data.users.findIndex((user) => id === user.id)
  const [deletedUser] = data.users.splice(index, 1)
  return Response.json(deletedUser)
}
