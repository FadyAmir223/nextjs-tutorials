import { useFormStatus } from 'react-dom'
import { FaPaperPlane } from 'react-icons/fa'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className='group flex justify-center items-center gap-x-2 w-[8rem] h-[3rem] bg-gray-900 text-white rounded-full transition-[transform_colors] outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 disabled:pointer-events-none disabled:bg-opacity-65'
      disabled={pending}
    >
      {pending ? (
        <div className='w-5 h-5 rounded-full border-b-2 border-white animate-spin' />
      ) : (
        <>
          Submit{' '}
          <FaPaperPlane className='text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1' />
        </>
      )}
    </button>
  )
}
