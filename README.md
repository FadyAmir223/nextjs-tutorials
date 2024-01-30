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


## streaming
break down the page's HTML into smaller chunks and send chunks from server to client <br/>
this enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered <br />
data can be blocked if fetch request depend on another fetch result

### blocking
```tsx
const Page = async ({ params }) => {
  const artist = await getArtist(params.artistName)

  <>
    <h1>products</h1>
    <Suspense fallback={<Loading />}>
      <Playlists artistId={artist.id} />
    </Suspense>
  </>
}

const Playlists = async ({ artistId }) => {
  const playlists = await getPlaylist(artistId)

  return <div />
}
```

### parallel fetch
prevents waterfalls

```tsx
const getArtist = () => {}
const getAlbums = () => {}

const Page = async ({ params: { artistName } }) => {
  const artistPromise = getArtist(artistName)
  const albumsPromise = getAlbums(artistName)
  const [artist, albums] = await Promise.all([artistPromise, albumsPromise])

  <>
    <h1>{artistName}</h1>
    <Albums albums={albums} />
  </>
}

const Albums = async ({ albums }) => {
  return <div />
}
```

if you want to use same user object in multiple components you don't need to pass it as props, just fetch it because fetch is memoized


### pre-loading
to further optimize parallel fetch and not passing promise result as props
create function that evaluate the function and return undefined

```tsx
// albums/page.tsx
export const preload = (artistName) => {
  void getAlbums(artistName)
}

export default const Albums = async ({ artistName }) => {
  const albums = await getAlbums(artistName)
  return <div />
}
```

```tsx
// [artistName]/page.tsx
export const Page = async ({ params: { artistName } }) => {
  prelaod(artistName)
  const artist = await getArtist(artistName)

  <>
    <h1>{artistName}</h1>
    <Albums albums={albums} />
  </>
}
```
# Rendering

## server component
react renders server components into a special data format, optimized for streaming, called the React server component Payload (RSC payload)

3 strategies
- static rendering
routes are rendered at build time <br />
or in background after data revalidation <br />
useful with non personalized data <br />
eg. static blog post | product page


- dynamic rendering
- streaming

### benefits of server rendering
- data fetching close to database reducing #requests & time
- caching generated HTML reducing #cost & improve performance
- reduce bundle size by keeping heavy deps on server
- First Contentful Paint (FCP)
- SEO
- streaming by split rendering into chunks and stream them to client

###
you choose when to
- cache
- revalidate
- stream

###
become dynamic rendered at request time when using
- headers()
- cookies()
- searchParams


## client component
why to use? accessing browser localStorage or geolocation

declared by incliding 'use client' at top of file <br />
to use hooks or interactivity <br />
any module imported into client component becomes part of client bundle <br />
by default everything in /app is server components <br />
becomse client component when 'use client' or imported in client component <br />
it is about import tree not render tree <br />
you can render server component inside client component by passing it as {children} (or any prop) from server component



## client vs server components
server
- fetch data close to database
- keep large deps on the server

client
- event listeners eg. onClick
- use hooks eg. useState
- browser Apis eg. localStorage
- class components


## leaking
env vars not prefixed with NEXT_PUBLIC will be empty string on the client <br />
to prevent this sort of unintended client usage of server code you can use the server-only package to give other developers a build-time error if they accidentally import one of these modules into a client component <br />
Then import the package into any module that contains server-only code

```tsx
import 'server-only'
 
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    }
  })

  return res.json()
}
```

## context
You should render providers as deep as possible in the tree – notice how ThemeProvider only wraps {children} instead of the entire `<html>` document. This makes it easier for Next.js to optimize the static parts of your Server Components.

```tsx
import ThemeProvider from './theme-provider'
 
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

## serialization
Props passed from the Server to Client Components need to be serializable

##
You cannot import a Server Component into a Client Component <br />
but can pass server components to client component as props

```tsx
'use client'

import { useState } from 'react'

export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
 
      {children}
    </>
  )
}
```
# Cache

![caching overvieww](/assets/caching-overview.avif)

there are 4 types of caches
### client
- router cache

### server
- full route cache
- request memoization
- data cache


## request memoization

![request memoization](/assets/request-memoization.avif)

enables you to fetche to same url without prop drilling <br />
the cache lasts the lifetime of a server request until the React component tree has finished rendering <br />
is not shared across server requests and only applies during rendering

opt out
```tsx
const { signal } = new AbortController()
fetch(url, { signal })
```

## data cache

![data cache](/assets/data-cache.avif)

whether data is cached or un-cached `request memoization` always cache the response <br />
the data cache is persistent across incoming requests and deployments unless you revalidate or opt-out

opt out
```tsx
fetch(url, { cache: 'no-store' })
```

#### reavlidate
- time based
for data that changes infrequently and freshness is not as critical
```tsx
fetch(url, { next: { revalidate: 3600 } })
```

- on demand
revalidate data based on eg. form submission <br />
can use a tag-based or path-based approach to revalidate groups of data at once

```tsx
// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'
```

## full route cache

![full route cache](/assets/full-route-cache.avif)

has different names
- Automatic Static Optimization
- Static Site Generation (SSG)
- Static Rendering

the process of rendering and caching statically rendered routes at build time or during revalidation

static routes are cached by default but dynamic routes are rendered at request time and not cached

#### reavlidate
- revalidating data cache will in turn invalidate full router caceh
- redeploying - unlike the data cache which persists across deployments

opt out
- dynamic functions - headers() | cookies()

- this will skip full route cache and data cache
```tsx
dynamic = 'force-dynamic'
//or
revalidate = 0
```

## router cache

![router cache](/assets/router-cache.avif)


enable user to smoothly naviage back and forth between routes <br />
cleared on page refresh <br />

#### duration
staticall rendered: 5 minutes
dynamically rendered: 30 second
from the time it was last accessed

By adding `prefetch={true}` or calling `router.prefetch` for a dynamically rendered route, you can opt into caching for 5 minutes.

#### invalidation
- `router.refresh()`

- server actions:
  - `revalidatePath()` | `revalidateTag()`
  - `cookies.set()` | `cookies.delete()`



## `generateStaticParams`
can be used for dynamic routes eg. app/blog/[slug]/page.tsx to statically generate routes at build time and cached in the 'full route cache' instead of on-demand at request time

at request time, Next.js will also cache paths that weren't known at build time the first time they're visited <br />
You can disable caching at request time by using

```tsx
export const dynamicParams = false
```

```tsx
// return list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch(url).then((res) => res.json())
  return posts.map(({ slug }) => ({ slug }))
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```

## in nutshell
![APIs cache interaction](/assets/_apis-cache-interaction.png)


# Fonts

## google
```tsx
import { Inter, Roboto_Mono } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// If you can't use a variable font, you will need to specify a weight
const roboto = Roboto_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### with tailwind
```tsx
import { Inter, Roboto_Mono } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
}
```

## local
```tsx
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
})

// If you want to use multiple files for a single font family
const roboto = localFont({
  src: [
    {
      path: './Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```# Optimizing

## <Image />

### local image
next.js will automatically determine the width and height of the image based on the imported file

```tsx
import Image from 'next/image'
import profilePic from './me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

### remote image
since next.js doesn't have access to remote files during build process, you'll need to provide the width and height

```tsx
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

but have to whitelist the sites

```tsx
// next.convig.ts

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
      },
    ],
  },
}
```

### options
```tsx
<Image
  src=""
  alt=""
  priority // for large LCP image
  fill // if you don't know the size of an image
       // parent element must have `positiion: relative; display: block`
  size='(max-width: 768px) 100vw, 33vw' // used with fill for responsiveness
  placeholder='blur' // while the image is loading
/>
```

### examples
#### responsive image

![responsive image](/assets/responsive-image.avif)

```tsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'
 
export default function Responsive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        src={mountains} // 'import' automatically set the width and height
        alt="Mountains"
        sizes="100vw"
        className='w-full h-auto'
      />
    </div>
  )
}
```

#### fill container

![fill container](/assets/fill-container.avif)

```tsx
import Image from 'next/image'
import mountains from '../public/mountains.jpg'
 
export default function Fill() {
  return (
    <div className='grid gap-3 grid-cols-[repeat(auto-fit,minmax(400px,auto))]'>
      <div className='relative h-[400px]'>
        <Image
          src={mountains}
          alt="Mountains"
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          className='object-cover' // contain | none
        />
      </div>
    </div>
  )
}
```

### sizes property
if you know your styling will cause an image to be full-width on mobile devices, in a 2-column layout on tablets, and a 3-column layout on desktop displays, you should include a sizes property

```tsx
import Image from 'next/image'
 
export default function Page() {
  return (
    <div className="grid-element">
      <Image
        fill
        src="/example.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
```

# Lazy loading
applies only to client components

can be done using
- React.lazy() with Suspense
- dynamic imports with 'next/dynamic'

## React.lazy() & Suspense
Client Components will be pre-rendered (SSR) by default

wrap blocking components that fetch data in <Suspense /> instead of lading the whole page


## dynamic import
```tsx
'use client'
 
import { useState } from 'react'
import dynamic from 'next/dynamic'
 
const ComponentA = dynamic(() => import('../components/A'))
const ComponentB = dynamic(() => import('../components/B'))
const ComponentC = dynamic(() => import('../components/C'), { 
  ssr: false,
  loading: () => <Loading />
})

export default function ClientComponent() {
  const [showMore, setShowMore] = useState(false)
 
  return (
    <>
      <ComponentA /> {/* Load immediately, but in a separate client bundle */}      

      {showMore && <ComponentB />} {/* Load on demand, only when the condition met */}

      <ComponentC /> {/* Load only on the client side */}
    </>
  )
}
```

if you dynamically import a server component, only the client components that are children of the server component will be lazy-loaded - not the server component itself

```tsx
import dynamic from 'next/dynamic'
 
const ServerComponent = dynamic(() => import('../components/ServerComponent'))
 
export default function ServerComponentExample() {
  return <ServerComponent />
}
```

## loading external library

```tsx
'use client'
 
import { useState } from 'react'
 
const names = ['Tim', 'Joe', 'Bel', 'Lee']
 
export default function Page() {
  const [results, setResults] = useState()

  return (
    <input
      type='text'
      onChange={async (e) => {
        // Dynamically load fuse.js
        const Fuse = (await import('fuse.js')).default
        const fuse = new Fuse(names)
      }}
    />
  )
}
```

## import named export
```tsx
// hello.tsx
'use client'
 
export function Hello() {
  return <p>Hello!</p>
}


// app/page.tsx
import dynamic from 'next/dynamic'
 
const ClientComponent = dynamic(() =>
  import('../components/hello').then((module) => module.Hello)
)
```
# Authentication

































































































# bundle analyzer
```sh
npm i @next/bundle-analyzer
```


# Analytics
what it covers
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)

```tsx
'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
}
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
