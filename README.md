# setup
```bash
npx my-app create-next-app@latest --ts --tailwind --eslint --src-dir --app --import-alias '@/*'
```
# Routing

## special
### files
- page.tsx
- layout.tsx
- template.tsx
- not-found.tsx
- loading.tsx
- error.tsx
- global-error.tsx
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


### folders
- _private
- %5Fpublic
- (logical)
- [...slug]
- [[...slug]]
- @feature
- (.)dir
- (..)dir
- (...)dir


## routing
```
app/
├── favicon.ico
├── robots.txt
├── page.tsx
├── layout.tsx
├── loading.tsx
├── middleware.ts
├── api
│   └── user
│       └── route.ts
├── route-name
│   ├── page.tsx
│   └── paramName
│       ├── error.tsx
│       ├── layout.tsx
│       └── page.tsx
├── route-name2
│   ├── page.tsx
│   └── [[...slug]]
│       └── page.tsx
├── _private
│   └── helpers.ts
├── %5Fpublic
│   └── page.tsx
├── (logical-group)
│   ├── forgot-password
│   │   └── page.tsx
│   ├── template.tsx
│   └── (with-layout)
│       ├── layout.tsx
│       ├── login
│       │   └── page.tsx
│       └── register
│           └── page.tsx
└── dashboard
    ├── layout.tsx
    ├── default.tsx
    ├── page.tsx
    ├── @notifications
    │   ├── archive
    │   │   └── page.tsx
    │   └── page.tsx
    └── @users
        ├── default.tsx
        └── page.tsx
```


## layout
acts like <Outliet /> wraps children with eg. <header /> & <footer /> <br/>
state preserved on navigtion


## template
like layout but on navigation:
- create new instance
- DOM elements re-created
- reset state
- effects re-synchronized


## error
```tsx
const Error = ({ error, reset }: { error: Error, reset: () => void }) => {
  return (
    <>
      <h1>error: {error.message}</h1>
      <button onClick={() => reset()}>try again</button>
    </>
  )
}
```

## global error
error.tsx don't wrap layout and template that global-error.tsx wrap the entire app

## not-found
runs when path not exist <br/>
can be run programatically for [queries]

<!-- { error: Error, reset: () => void }   'use client' for reset() -->
```tsx
import { notFound } from 'next/navigation'
if (!user.name) return notFound()
```

# parms
/app/products/[productId]

```tsx
import { useSearchParams } from 'next/navigation'

const Product = ({ params: { productId: string } }) => {
  const searchParams = useSearchParams()
  const searchParamsObject = Object.fromEntries(searchParams)
}
```

/app/docs/[[...slug]]
```tsx
const Component = ({ params: { slug: string[] } }) => {}
```


## metadata
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
export const generateMetadata = ({ params }: ComponentProps): Metadata => ({
  title: `${params.id}`,
  description: ''
})

// API
export const generateMetadata = async ({ params }: ProductProps): Promise<Metadata> => {
  const response = await fetch(`/api/product/${params.id}`)
  const { title } = await response.json()
  return { title }
}
```


## streaming
break down the page's HTML into smaller chunks and send chunks from server to client <br/>
this enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered

```tsx
const App = async () => (
  <>
    <h1>products</h1>
    <Suspense fallback={<Loading />}>
      <ListProducts />
    </Suspense>
  </>
)


const ListProducts = () => {
  const response = await fetch('/api/products')
  const { products } = await response.json()

  return <div />
}
```


## navigation
```tsx
import Link from 'next/link'
const Component = () => <Link href='/route' replace>route</Link>
```


### access route segment
```tsx
import { usePathname } from 'next/navigation'
const pathName = usePathname()
const isActive = pathName.startsWith(url)
```


### redirect
#### client component
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

#### server component | router handler | server action
"redirect"
- used outside try catch
- can be called in Client Components during the rendering process

```tsx
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

revalidatePath('/posts') // Update cached posts
redirect('/route')
```

"permanentRedirect"
- used after a mutation that changes an entity's canonical URL such as updating a user's profile URL after they change their username

```tsx
'use server'
 
import { permanentRedirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
 
export const updateUsername = async (username: string) {
  try { /* update database */ } catch {}
 
  revalidateTag('username') // Update all references to the username
  permanentRedirect(`/profile/${username}`)
}
```

#### middleware
intercept requests to specific routes <br/>
should be in root '/app/middleware.ts'

```tsx
import { type NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@lib/auth'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard'))
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))

  if (isAuthenticated)
    return NextResponse.next()
  
  const headers = new Headers(request.headers)
  headers.set('header-name', 'value')

  if (request.cookies.has('cookieName'))
    request.cookies.delete('cookieName')

  const response = NextResponse.next()
  response.headers.set('x-hello-from-middleware2', 'hello')
  response.cookies.set('anotherCookie', 'value')
  return response
}

// string | string[] | regex
export const config = {
  matcher: [
    '/about',
    '/dashboard/:path', // dashboard/a
    '/dashboard/:path*', // dashboard/a/b/c

    /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      * ignore pre-fetches
    */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}

```

### parallel routes
instead of importing components from its folder <br/>
you can import users, notifications in layout.tsx as props

- dashboard
  - page.tsx
  - layout.tsx
  @users
    - page.tsx
  @notifications
    - page.tsx


in routing inside notifications /dashboard/archive <br/>
you should define default page for dashboard (children) and users <br/>
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


### intercepting routes
when navigating to another route render interceport component <br/>
on refresh render the original component

common usage: modals
- login form
- image slider

```
app/f1
├── f2
│   ├── f3
│   │   └── (...f1)
│   └── (..f4)
├── (.)f2
└── f4
```

(.) for neighbour routes  f1 -> f2 and (.)f2
```
f1
├── f2
└── (.)f2
```

(..) for up level routes  f1/f2/../f4
```
f1
├── f2
│   └── (..f4)
└── f4
```

(...) for any nested level to root '/any'
```
f1
└── f2
    └── f3
        └── (...f1)
```

## route handlers (backend)
```
app
└── api
    ├── routes.ts
    └── [id]
        └── routes.ts
```

export function matching http verb (GET, POST...)

```tsx
import { type NextRequest, NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('q') || ''
  const filteredUsers = data.users.filter((user) => user.name.includes(query))

  const headerList = headers() // read only
  // or  new Headers(request.headers)
  const token = headerList.get('Authorization')

  const cookieList = cookies()
  const theme = cookieList.get('theme')
  // or  request.cookies.get()
  cookieList.set('theme', 'dark', { httpOnly: true, secure: true })

  return Response.json({ users: filteredUsers, token, theme })
}

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  const newUser = { id: data.users.length + 1, name }
  data.users.push(newUser)

  return NextResponse.json(newUser, { status: 200 })

  /* or
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  }) */
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


## cahce
client side cache is 5 minute <br/>
on build all responses are cached <br/>
GET methods with Response object are cached <br/>
problem: random - date

#### not cached:
- Request object with GET   (eg. used searchParams)
- other methods
- dynamic functions  cookies() & headers()

#### to not cache a component
```tsx
export const dynamic = 'force-dynamic' // default 'auto'
```

#### reavalidate (fetch) each minues
response stored in data cache on server

```tsx
// or
export const revalidate = 60

export async function Component() {
  const res = await fetch(url, { next: { revalidate: 60 }})
}
```

#### CORS

```tsx
async function GET(request: Request) {
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

#### config
```tsx
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```# Data Fetching

data ca be fetched on client or server


## methods
- static site generation        (SSG)
- incremental site regeneration (ISR)
- server side rendering         (SSR)
- client side rendering         (CSR)


### fetch on server
```tsx
const Component = async () => {
  const respopnse = await fetch('/api/products')
  if (!response.ok) throw new Error('failed to load data')
  const data = await response.json()

  return <div />
}
```

#### extended fetch
```tsx
fetch(url, {
  cache: 'no-store',
  next: {
    revalidate: 3600,       // if 0 then no cache
    tags: ['collection'],   // data cache
  },
})
```

#### revalidate data
means updating the cache, ways:
- time-based
  auto revalidate, for data that changes infrequently
```tsx
fetch(url, { next: { revalidate: 3600 }})
```

to revalidate all fetch requests in a route segment, you can use the
```tsx
// page.tsx | layout.tsx
export const revalidate = 3600
```

for statically rendered routes <br/>
If you have multiple fetch requests with different revalidation frequency <br/>
The lowest time will be used for all requests

for dynamically rendered routes <br/>
each fetch request will be revalidated independently


- on-demand
  manually revalidate after eg. form submission <br/>
  can use a tag-based or path-based approach to revalidate groups of data at once.

can be done in 'server actions' or 'route handlers'
path `revalidatePath`
cache tag `revalidateTag`

```tsx
async function ServerComponent() {
  const res = await fetch(url, { next: { tags: ['collection'] } })
  const data = await res.json()
  return <div />
}
```

```tsx
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function serverAction() {
  revalidateTag('collection')
}
```

#### data caching
data returned from fetch() is cached in 'data cache' on server <br />
data can be fetched at build time or request time

```tsx
fetch(url, { cache: 'force-cache' /* default */})
```

fetch requests that use the POST method are automatically cached. Unless it's inside Route Handler that uses the POST method.

##### cache requests of third party libs
```tsx
import { cache } from 'react'

const getData = cache(async () => {
  const res = await axios.get(url);
  const data = await res.json();
  return data;
})

// on page
export const revalidate = 3600;

export default async function Page() {
  const someData = await getData();
}
```

`Since Server Components render on the server, you don't need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.`



# Server actions
run on server to handle form submission and data mutation <br/>
you can revalidate data or redirect (both outside try catch)

server actions can be invoked in:
- `<form />`
- `<button />`
- `<input type='submit' />`
- `<input type='image' />`
- event handlers eg. onClick, onChange
- onKeyDown
- useEffect

```tsx
async function submitForm(formData) {
  'use server'
  //...
}

const function ServerComponent() {
  return <form action={submitForm}></form>
}
```

```tsx
// @/actions/submitForm.ts
'use server' // mark as server action
export async function submitForm(formData) {}


// @/app/page.tsx

import { submitForm } from '@/actions/submitForm'
const function ClientComponent() {
  return <form action={submitForm}></form>
}
```

### pass extra args
```tsx
async function serverActon(userId, formData) {
  'use server'
}

export default function ServerComponent({ userId }) {
  const serverActionWithId = serverAction.bind(null, userId) // js method
  return <form action={serverActionWithId}></form>
}
```

### pending state
```tsx
import { useFormStatus } from 'react-dom'

function Component() {
  const { pending } = useFormStatus()
  return <button type='submit' aria-disabled={pending}>submit</button>
}
```

### error message
for simple form like login <br />
`wrong email or password` <br />
only one message shown unlike register

```tsx
'use server'
 
export async function createUser(prevState: any, formData: FormData) {
  // ...
  return { message: 'please enter a valid email' }
}
```

```tsx
'use client'
import { useFormState } from 'react-dom'
import { createUser } from '@/app/actions'
 
const initialState = { message: '' }

export function Signup() {
  const [state, formAction] = useFormState(createUser, initialState)

  return <form action={formAction}></form>
}
```

### optimistic update
```tsx
'use client'

import { useOptimistic } from 'react'
import { addUser } from '@/actions/adduser' 

function Component({ users }) {
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser: User) => [...state, newUser],
  )

  const clientAction = (formData: FormData) => {
    //...
    addOptimisticUser({ id: Math.random(), name: formData.get('name') })
  }

  return (
    <>
      <form action={clientAction}></form>
      <ul>
        {optimisticUsers.map(user => <li>{user.name}</li>)}
      </ul>
    </>
  )
}
```

### programatic submission
on key down `ctrl + enter`

```tsx
'use client'
 
export function Entry() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }
 
  return <textarea onKeyDown={handleKeyDown} />
}
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


# server components
by default all components in /app are server components
it becomes client compoenent when 'use client' or import from client component

pros:
  - fetch in component directly close to the data source
  - keep large dependencies on the server

'user server' runs the function on the server removing the boundary between client and server

```tsx
export function Component({ searchParams }:
 { searchParams: [key: string]: string | string[] | undefined }) {}
```

### server actions
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



## image
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


## environment variables
- .env (public)
  NEXT_PUBLIC_API_URL (shipped to the browser)

- .env.local (private)
  MY_SECRET (kept on server - no client components)

```tsx
process.env.NEXT_PUBLIC_API_URL
process.env.MY_SECRET
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
