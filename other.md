# setup
```bash
npx my-app create-next-app@latest --ts --tailwind --eslint --src-dir --app --import-alias '@/*'
```

# concepts
- API route handlers
- server actions
- server components


# methods
- static site generation (SSG)
- incremental site regeneration (ISR)
- server side rendering (SSR)
- client side rendering (CSR)


# notes
'use client' to use hooks or interactivity
by default everything in /app is server components
becomse client component when 'use client' or imported in client component
it is about import tree not render tree
you can render server component inside client component by passing it as {children} from server component


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


# environment variables
- .env (public)
  NEXT_PUBLIC_API_URL (shipped to the browser)

- .env.local (private)
  MY_SECRET (kept on server - no client components)

```tsx
process.env.NEXT_PUBLIC_API_URL
process.env.MY_SECRET
```


### server component
```tsx
export function Component({ searchParams }:
 { searchParams: [key: string]: string | string[] | undefined }) {}
```
