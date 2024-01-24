# setup
```bash
npx my-app create-next-app@latest --ts --tailwind --eslint --src-dir --app --import-alias '@/*'
```

# concepts
- API route handlers
- server actions
- server components


# notes
'use client' to use hooks or interactivity
by default everything in /app is server components
becomse client component when 'use client' or imported in client component
it is about import tree not render tree
you can render server component inside client component by passing it as {children} from server component


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

- favicon.ico
- robots.txt

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
  - favicon.ico
  - robots.txt

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


# not found
not-found.tsx runs when path not exist
can be run programatically for [queries]

```tsx
import { notFound } from 'next/navigation'
if (!user.name) return notFound()
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

  return NextResponse.json(newUser, { status: 200 })

  // return new Response(JSON.stringify(newUser), {
  //   status: 201,
  //   headers: { 'Content-Type': 'application/json' },
  // })
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
by default client side cache is 5 minute
by default on build all responses are cahched
problem: random - date

### to not cache a component
```tsx
export const dynamic = 'force-dynamic' // default 'auto'
```

### fetch each hour
response stored in data cache on server

```tsx
export async function Component() {
  const res = await fetch(url, { next: { revalidate: 3600 }})
}
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
<Image
  src=''
  alt=''
  width={}
  height={}
>
```

# server components
by default all components in /app are server components
it becomes client compoenent when 'use client' or import from client component

pros:
  - fetch in component directly close to the data source
  - keep large dependencies on the server

'user server' runs the function on the server removing the boundary between client and server

```tsx
import { revalidatePath } from 'next/cache'

function Form() {
  const addUser = async (formData: FormData) => {
    'use server'

    const name = formData.get('name')

    await fetch('http://localhost:3000/api/users', {
      body: JSON.stringify({ name }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/')
  }

  return (
    <form action={addUser}>
      <input type='text' name='name' id='name' placeholder='name' />
      <button>submit</button>
    </form>
  )
}

export default Form
```

wrap blocking components that fetch data in <Suspense /> instead of lading the whole page


# environment variables
- .env (public)
  NEXT_PUBLIC_API_URL (shipped to the browser)

- .env.local (private)
  MY_SECRET (kept on server - no client components)

```tsx
process.env.NEXT_PUBLIC_API_URL
process.env.MY_SECRET
```

# searchParams

### client component
```tsx
import { useSearchParams } from 'next/navigation'
const searchParams = useSearchParams()
const searchParamsObject = Object.fromEntries(searchParams)
```

### server component
```tsx
export function Component({ searchParams }:
 { searchParams: [key: string]: string | string[] | undefined }) {}
```

# zod

```tsx
import { z } from 'zod'

const xSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, 'message').max(10).optional(),
  id: z.coerce.number().int().positive(),
  color: z.enum(['red', 'green', 'blue'])
})
```

### wehre to use zod
#### client
  - API
  - URL
  - form data
  - localStorage
  - third party API

#### server
  - URL
  - third party API
  - environment variables
  - webhooks (stripe)
  - file system

  ORM
    - prisma
    - mongoose

# notes
libraries still use with next.js:
  - redux-toolkit
  - react-query
  - react-hook-form

libraries stop use with next.js:
  - react-router-dom
