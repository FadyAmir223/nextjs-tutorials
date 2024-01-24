// import Image from 'next/image'

import Link from 'next/link'

export async function Home() {
  return (
    <div>
      {/* <Image src='/x.png' alt='x' width={600} height={600} /> */}
      <Link href='/posts'>go to posts</Link>
    </div>
  )
}

export default Home
