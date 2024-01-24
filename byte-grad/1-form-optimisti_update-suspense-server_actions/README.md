# setup
```bash
npx my-app create-next-app@latest --ts --tailwind --eslint --src-dir --app --import-alias '@/*'
```


# notes
by default they are server componsnts
'use client' to use hooks


# layout
take children which is like <Outlet />
state preserved on navigtion


# template
like layout but on navigation:
- create new instance
- DOM elements re-created
- reset state
- effects re-synchronized


# special
## files
- page.tsx
- layout.tsx
- template.tsx
- not-found.tsx
- loading.tsx
- error.tsx
- default.tsx

- route.ts
- middleware.ts

```tsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```


## folders
- _private
- %5Fpublic
- (logical)
- [...slug]
- [[...slug]]
- @feature
- (.)dir
- (..)dir
- (...)dir

# routing
- /app
  - page.tsx
  - layout.tsx
  - loading.tsx

  - middleware.ts

  - api
    - user
      - route.ts

  - route-name
    - page.tsx

    - [paramName]
      - page.tsx            <!-- { params: { paramName: string } } -->
      - layout.tsx
      - error.tsx           
        <!-- { error: Error, reset: () => void }   'use client' for reset() -->

  - route-name
    - [[...slug]]           <!-- { params: { slug: string[] } } -->
      - page.tsx

  - _priavte
    - helpers.ts

  - %5Fpublic
    - page.tsx

  - (logical-group)
    - template.tsx

    - forgot-password
      - page.tsx

    - (with-layout)
      - layout.tsx
      - login
        - page.tsx
      - register
        - page.tsx

  - dashboard
    - layout.tsx
    - page.tsx
    - default.tsx
    @users
      - page.tsx
      - default.tsx
    @notifications
      - page.tsx
      - archive
        - page.tsx
  
    - api
      - users
          route.ts


# metadata
- in layout.tsx | page.tsx
- properites merged
- more deep overwrites

```tsx
import { Metadata } from 'next'

// static
export const metadata: Metadata = {
  title: '',
  description: ''
}

export const metadata: Metadata = {
  title: {
    default: '',                // no title provided
    template: '%s | my-site',   // on child metadata.title will replace %s
    absolute: ''                // ignores template (used in child)
  },
}

// dynamic
export const createMetadata = ({ params }: ComponentProps): Metadata => ({
  title: '${params.id}',
  description: ''
})
```


# navigation
```tsx
import Link from 'next/link'

const Component = () => <Link href='/route' replace>route</Link>
```


## active route
```tsx
import { usePathname } from 'next/navigation'

const pathName = usePathname()

const isActive = pathName.startsWith(url)
```


## route programatically
```tsx
import { useRouter } from 'next/navigation'
  
const router = useRouter()

const handleClick = () => {
  router.push('/route')
  router.replace('/route')
  router.back()
  router.forward()
}
```


## parallel routes
instead of importing components from its folder
you can import users, notifications in layout.tsx as props

- dashboard
  - page.tsx
  - layout.tsx
  @users
    - page.tsx
  @notifications
    - page.tsx


in routing inside notifications /dashboard/archive
you should define default page for dashboard (children) and users
this ensure to not render a route that should not be parallel rendered

- dashboard
  - layout.tsx
  - page.tsx
  - default.tsx
  @users
    - page.tsx
    - default.tsx
  @notifications
    - page.tsx
    - archive
      - page.tsx


## intercepting routes
when navigating to another route render interceport component
on refresh render the original component

common usage: modals
- login form
- image slider

- f1
  - f2
    - f3
      - (...)f1
    - (..)f4
  - (.)f2
  - f4

(.) for neighbour routes  f1 -> f2 and (.)f2
- f1
  - f2
  - (.)f2

(..) for up level routes  f1/f2/../f4
- f1
  - f2
    - (..)f4
  - f4

(...) for any nested level to root '/any'
- f1
  - f2
    - f3
      - (...)f1


# route handlers (backend)
- app
  - api
    - route.ts
    - [id]
      - route.ts

export function matching http verb (GET, POST...)

```tsx
import { headers, cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

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
```


# cahce
by default on build all responses are cahched
problem: random - date
to not cache a component
```tsx
export const dynamic = 'force-dynamic' // default 'auto'
```

what is not cached is:
- using Request object with GET
- using headers() & cookies()
- http methos other than GET


# middleware
should be in root '/app/middleware.ts'
intercept specific routes

```tsx
export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/dest', request.url))
}

export const config = {
  matcher: '/source',
}
```


# image
- auto compress image
- responsive images
- prevent layout shift (CLS)

```tsx
import Image from 'next/image'
<Image src='' alt='' width='' height=''>
```

















