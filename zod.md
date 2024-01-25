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
