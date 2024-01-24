import Link from 'next/link'

const Login = () => {
  return (
    <>
      <div>Login</div>
      <Link href='/register' replace>
        register
      </Link>
    </>
  )
}

export default Login
