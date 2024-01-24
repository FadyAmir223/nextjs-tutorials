'use client'

const ThrowError = () => {
  const random = Math.ceil(Math.random() * 2) === 1

  if (random) throw new Error('something went wrong')

  return <div>welcome</div>
}

export default ThrowError
