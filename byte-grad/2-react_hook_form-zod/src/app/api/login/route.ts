import { loginFormSchema } from '@/lib/validations'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body: unknown = await request.json()
  const result = loginFormSchema.safeParse(body)

  let errors = {}
  if (!result.success)
    errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

  return Object.keys(errors).length === 0
    ? NextResponse.json({ success: true })
    : new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
}
