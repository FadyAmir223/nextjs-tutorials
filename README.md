

































































































































































































































 
 
 
 
 
 
 
 
 
  
      ],
      },
    */
    /*
    //...
    </>
    </>
    <>
    <>
    {
    }
    })
    },
    },
  )
  )
  )
  )
  // ...
  //...
  </>
  <>
  ],
  }
  }
  }
  })
  }) */
  },
  },
)
) {
) {
) {
>
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
```
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
})
})
})
})
- %5Fpublic
├── %5Fpublic
    '/about',
    absolute: ''                // ignores template (used in child)
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
### access route segment
// @/actions/submitForm.ts
acts like <Outliet /> wraps children with eg. <header /> & <footer /> <br/>
    addOptimisticUser({ id: Math.random(), name: formData.get('name') })
  alt=''
└── api
├── api
  - API
// API
      * - api (API routes)
- API route handlers
app
app/
/app/docs/[[...slug]]
app/f1
// @/app/page.tsx
/app/products/[productId]
    - archive
    │   ├── archive
async function GET(request: Request) {
async function serverActon(userId, formData) {
async function ServerComponent() {
async function submitForm(formData) {
- auto compress image
  auto revalidate, for data that changes infrequently
    await fetch('http://localhost:3000/api/users', {
```bash
becomse client component when 'use client' or imported in client component
      body: JSON.stringify({ name }),
break down the page's HTML into smaller chunks and send chunks from server to client <br/>
- <button />
      <button onClick={() => reset()}>try again</button>
      <button>submit</button>
by default all components in /app are server components
by default everything in /app is server components
  cache: 'no-store',
##### cache requests of third party libs
cache tag `revalidateTag`
## cahce
- can be called in Client Components during the rendering process
can be done in 'server actions' or 'route handlers'
can be run programatically for [queries]
  can use a tag-based or path-based approach to revalidate groups of data at once.
#### client
#### client component
client side cache is 5 minute <br/>
- client side rendering         (CSR)
  color: z.enum(['red', 'green', 'blue'])
common usage: modals
# concepts
#### config
  const addUser = async (formData: FormData) => {
const App = async () => (
  const clientAction = (formData: FormData) => {
const Component = async () => {
const Component = () => <Link href='/route' replace>route</Link>
const Component = ({ params: { slug: string[] } }) => {}
  const cookieList = cookies()
  const data = await res.json()
  const data = await res.json();
  const data = await response.json()
  const [deletedUser] = data.users.splice(index, 1)
const Error = ({ error, reset }: { error: Error, reset: () => void }) => {
  const filteredUsers = data.users.filter((user) => user.name.includes(query))
const function ClientComponent() {
const function ServerComponent() {
const getData = cache(async () => {
const handleClick = () => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const headerList = headers() // read only
  const headers = new Headers(request.headers)
  const id = +context.params.id
  const id = +context.params.id
  const id = +context.params.id
  const index = data.users.findIndex((user) => id === user.id)
  const index = data.users.findIndex((user) => id === user.id)
const initialState = { message: '' }
const isActive = pathName.startsWith(url)
const ListProducts = () => {
  const modifiedUser = { id, name }
  const { name } = await request.json()
  const { name } = await request.json()
    const name = formData.get('name')
  const newUser = { id: data.users.length + 1, name }
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
const pathName = usePathname()
  const { pending } = useFormStatus()
const Product = ({ params: { productId: string } }) => {
  const { products } = await response.json()
  const query = searchParams.get('q') || ''
  const res = await axios.get(url);
  const res = await fetch(url, { next: { revalidate: 60 }})
  const res = await fetch(url, { next: { tags: ['collection'] } })
  const response = await fetch(`/api/product/${params.id}`)
  const response = await fetch('/api/products')
  const response = NextResponse.next()
  const respopnse = await fetch('/api/products')
const router = useRouter()
  const searchParamsObject = Object.fromEntries(searchParams)
  const { searchParams } = request.nextUrl
  const searchParams = useSearchParams()
  const serverActionWithId = serverAction.bind(null, userId) // js method
  const someData = await getData();
  const [state, formAction] = useFormState(createUser, initialState)
  const theme = cookieList.get('theme')
  const { title } = await response.json()
  const token = headerList.get('Authorization')
  const user = data.users.filter((user) => user.id === id)
const xSchema = z.object({
        'Content-Type': 'application/json',
  context: { params: { id: string } },
  context: { params: { id: string } },
  context: { params: { id: string } },
  cookieList.set('theme', 'dark', { httpOnly: true, secure: true })
#### CORS
- create new instance
- dashboard
- dashboard
└── dashboard
    '/dashboard/:path', // dashboard/a
    '/dashboard/:path*', // dashboard/a/b/c
data ca be fetched on client or server
#### data caching
data can be fetched at build time or request time
```# Data Fetching
data returned from fetch() is cached in 'data cache' on server <br />
  data.users[index] = modifiedUser
  data.users.push(newUser)
    default: '',                // no title provided
        ├── default.tsx
    - default.tsx
    ├── default.tsx
  - default.tsx
- default.tsx
  description: ''
  description: ''
- (.)dir
- (..)dir
- (...)dir
- DOM elements re-created
// dynamic
- dynamic functions  cookies() & headers()
each fetch request will be revalidated independently
      e.currentTarget.form?.requestSubmit()
- effects re-synchronized
  email: z.string().email(),
  - environment variables
## environment variables
- .env.local (private)
- .env (public)
      e.preventDefault()
## error
        </ErrorBoundary>
    </ErrorBoundary>
    <ErrorBoundary fallback={<Error />}>
        <ErrorBoundary fallback={<NotFound />}>
<!-- { error: Error, reset: () => void }   'use client' for reset() -->
### error message
- error.tsx
│       ├── error.tsx
error.tsx don't wrap layout and template that global-error.tsx wrap the entire app
- event handlers eg. onClick, onChange
export async function Component() {
export async function createUser(prevState: any, formData: FormData) {
export async function DELETE(
export async function GET(
export async function GET(request: NextRequest) {
export async function PATCH(
export async function POST(request: NextRequest) {
export async function submitForm(formData) {}
export const config = {
export const dynamic = 'auto'
export const dynamic = 'force-dynamic' // default 'auto'
export const dynamicParams = true
export const fetchCache = 'auto'
export const generateMetadata = async ({ params }: ProductProps): Promise<Metadata> => {
export const generateMetadata = ({ params }: ComponentProps): Metadata => ({
export const metadata: Metadata = {
export const metadata: Metadata = {
export const preferredRegion = 'auto'
export const revalidate = 3600
export const revalidate = 3600;
export const revalidate = 60
export const revalidate = false
export const runtime = 'nodejs'
export const updateUsername = async (username: string) {
export default async function Page() {
export default async function serverAction() {
export default Form
export default function ServerComponent({ userId }) {
export function Component({ searchParams }:
export function Entry() {
export function matching http verb (GET, POST...)
export function middleware(request: NextRequest) {
export function Signup() {
#### extended fetch
        └── (...f1)
│   │   └── (...f1)
f1
f1
f1
└── (.)f2
└── f2
├── (.)f2
├── f2
├── f2
├── f2
    └── f3
│   ├── f3
│   └── (..f4)
│   └── (..f4)
└── f4
└── f4
- favicon.ico
├── favicon.ico
      * - favicon.ico (favicon file)
- @feature
  - fetch in component directly close to the data source
### fetch on server
fetch requests that use the POST method are automatically cached. Unless it's inside Route Handler that uses the POST method.
fetch(url, {
fetch(url, { cache: 'force-cache' /* default */})
fetch(url, { next: { revalidate: 3600 }})
### files
  - file system
### folders
(...) for any nested level to root '/any'
for dynamically rendered routes <br/>
│   ├── forgot-password
    </form>
- <form />
    <form action={addUser}>
      <form action={clientAction}></form>
  - form data
(.) for neighbour routes  f1 -> f2 and (.)f2
for simple form like login <br />
for statically rendered routes <br/>
(..) for up level routes  f1/f2/../f4
function Component() {
function Component({ users }) {
function Form() {
GET methods with Response object are cached <br/>
## global error
- global-error.tsx
      <h1>error: {error.message}</h1>
    <h1>products</h1>
      headers: {
    headers: {
    headers: { 'Content-Type': 'application/json' },
  headers.set('header-name', 'value')
  height={}
│   └── helpers.ts
    └── [id]
  id: z.coerce.number().int().positive(),
    if (e.ctrlKey && e.key === 'Enter') {
  if (id > data.users.length) redirect('/api/users')
  if (isAuthenticated)
  if (request.cookies.has('cookieName'))
  if (request.nextUrl.pathname.startsWith('/dashboard'))
  if (!response.ok) throw new Error('failed to load data')
if (!user.name) return notFound()
If you have multiple fetch requests with different revalidation frequency <br/>
      * ignore pre-fetches
## image
<Image
- image slider
import { addUser } from '@/actions/adduser' 
import { cache } from 'react'
import { createUser } from '@/app/actions'
import { headers, cookies } from 'next/headers'
import Image from 'next/image'
import { isAuthenticated } from '@lib/auth'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { permanentRedirect } from 'next/navigation'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { revalidatePath } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { revalidateTag } from 'next/cache'
import { submitForm } from '@/actions/submitForm'
import { type NextRequest, NextResponse } from 'next/server'
import { type NextRequest, NextResponse } from 'next/server'
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { useOptimistic } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
- incremental site regeneration (ISR)
- in layout.tsx | page.tsx
- <input type='image' />
- <input type='submit' />
      <input type='text' name='name' id='name' placeholder='name' />
in routing inside notifications /dashboard/archive <br/>
instead of importing components from its folder <br/>
### intercepting routes
intercept requests to specific routes <br/>
it becomes client compoenent when 'use client' or import from client component
it is about import tree not render tree
  - keep large dependencies on the server
## layout
</Layout>
<Layout>
    ├── layout.tsx
  - layout.tsx
  - layout.tsx
- layout.tsx
│       ├── layout.tsx
│       ├── layout.tsx
├── layout.tsx
libraries still use with next.js:
libraries stop use with next.js:
like layout but on navigation:
      <ListProducts />
- loading.tsx
├── loading.tsx
  - localStorage
- (logical)
├── (logical-group)
│       ├── login
- login form
  manually revalidate after eg. form submission <br/>
      * Match all request paths except for the ones starting with:
  matcher: [
means updating the cache, ways:
## metadata
      method: 'POST',
## methods
#### middleware
- middleware.ts
├── middleware.ts
      missing: [
    - mongoose
- more deep overwrites
  MY_SECRET (kept on server - no client components)
  name: z.string().min(1, 'message').max(10).optional(),
## navigation
  next: {
      * - _next/image (image optimization files)
  NEXT_PUBLIC_API_URL (shipped to the browser)
      * - _next/static (static files)
#### not cached:
# notes
# notes
## not-found
- not-found.tsx
    ├── @notifications
  @notifications
  @notifications
npx my-app create-next-app@latest --ts --tailwind --eslint --src-dir --app --import-alias '@/*'
on build all responses are cached <br/>
- on-demand
- onKeyDown
on key down `ctrl + enter`
only one message shown unlike register
// on page
on refresh render the original component
### optimistic update
        {optimisticUsers.map(user => <li>{user.name}</li>)}
  /* or
// or
  ORM
  // or  new Headers(request.headers)
  // or  request.cookies.get()
- other methods
          <Page />
        └── page.tsx
      - page.tsx
    - page.tsx
    - page.tsx
    - page.tsx
    - page.tsx
    │   │   └── page.tsx
    │   └── page.tsx
    ├── page.tsx
  - page.tsx
  - page.tsx
- page.tsx
│           └── page.tsx
│       │   └── page.tsx
│       └── page.tsx
│       └── page.tsx
│   │   └── page.tsx
│   └── page.tsx
│   ├── page.tsx
│   ├── page.tsx
├── page.tsx
// page.tsx | layout.tsx
### parallel routes
│   └── paramName
# parms
### pass extra args
path `revalidatePath`
### pending state
"permanentRedirect"
  permanentRedirect(`/profile/${username}`)
- prevent layout shift (CLS)
    - prisma
- _private
├── _private
problem: random - date
process.env.MY_SECRET
process.env.NEXT_PUBLIC_API_URL
### programatic submission
- properites merged
pros:
  - react-hook-form
  - react-query
  - react-router-dom
#### reavalidate (fetch) each minues
"redirect"
### redirect
redirect('/route')
  - redux-toolkit
│       └── register
    request.cookies.delete('cookieName')
  _request: NextRequest,
  _request: NextRequest,
  request: NextRequest,
- Request object with GET   (eg. used searchParams)
- reset state
  response.cookies.set('anotherCookie', 'value')
  response.headers.set('x-hello-from-middleware2', 'hello')
response stored in data cache on server
- responsive images
  return (
  return (
  return (
  return <button type='submit' aria-disabled={pending}>submit</button>
  return data;
  return <div />
  return <div />
  return <div />
  return <form action={formAction}></form>
  return <form action={serverActionWithId}></form>
  return <form action={submitForm}></form>
  return <form action={submitForm}></form>
  return { message: 'please enter a valid email' }
  return new Response('Hello, Next.js!', {
  return new Response(JSON.stringify(newUser), {
  return NextResponse.json(newUser, { status: 200 })
    return NextResponse.next()
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  return response
  return Response.json(deletedUser)
  return Response.json(modifiedUser)
  return Response.json(user)
  return Response.json({ users: filteredUsers, token, theme })
  return <textarea onKeyDown={handleKeyDown} />
  return { title }
    revalidate: 3600,       // if 0 then no cache
#### revalidate data
    revalidatePath('/')
revalidatePath('/posts') // Update cached posts
  revalidateTag('collection')
  revalidateTag('username') // Update all references to the username
- robots.txt
├── robots.txt
## route handlers (backend)
├── route-name
├── route-name2
  router.back()
  router.forward()
  router.push('/route')
  router.replace('/route')
        └── routes.ts
    ├── routes.ts
- route.ts
│       └── route.ts
## routing
# Routing
run on server to handle form submission and data mutation <br/>
runs when path not exist <br/>
 { searchParams: [key: string]: string | string[] | undefined }) {}
#### server
### server actions
- server actions
# Server actions
server actions can be invoked in:
#### server component | router handler | server action
# server components
- server components
- server side rendering         (SSR)
# setup
should be in root '/app/middleware.ts'
`Since Server Components render on the server, you don't need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.`
- [...slug]
- [[...slug]]
│   └── [[...slug]]
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
## special
  src=''
    (state, newUser: User) => [...state, newUser],
state preserved on navigtion
// static
- static site generation        (SSG)
    status: 200,
    status: 201,
## streaming
// string | string[] | regex
      </Suspense>
    </Suspense>
      <Suspense fallback={<Loading/>}>
    <Suspense fallback={<Loading />}>
    tags: ['collection'],   // data cache
## template
  </Template>
  <Template>
    template: '%s | my-site',   // on child metadata.title will replace %s
- template.tsx
│   ├── template.tsx
The lowest time will be used for all requests
  - third party API
  - third party API
this enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered
this ensure to not render a route that should not be parallel rendered
- time-based
  title: '',
  title: {
  title: `${params.id}`,
#### to not cache a component
to revalidate all fetch requests in a route segment, you can use the
  try { /* update database */ } catch {}
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
```tsx
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      </ul>
      <ul>
  - URL
  - URL
'use client'
'use client'
'use client'
'use client' to use hooks or interactivity
- used after a mutation that changes an entity's canonical URL such as updating a user's profile URL after they change their username
- used outside try catch
- useEffect
│   └── user
    └── @users
    users,
  @users
  @users
'user server' runs the function on the server removing the boundary between client and server
    'use server'
  'use server'
  'use server'
'use server'
'use server'
'use server'
'use server' // mark as server action
  - webhooks (stripe)
### wehre to use zod
when navigating to another route render interceport component <br/>
  width={}
│   └── (with-layout)
wrap blocking components that fetch data in <Suspense /> instead of lading the whole page
`wrong email or password` <br />
you can import users, notifications in layout.tsx as props
you can render server component inside client component by passing it as {children} from server component
you can revalidate data or redirect (both outside try catch)
you should define default page for dashboard (children) and users <br/>
# zod
