'use client'

import { useState } from 'react'

const Template = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState('')

  return (
    <div>
      <input
        type='text'
        placeholder='template'
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      {children}
    </div>
  )
}

export default Template
