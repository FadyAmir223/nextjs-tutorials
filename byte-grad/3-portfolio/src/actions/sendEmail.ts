'use server'

import { createElement } from 'react'
import { Resend } from 'resend'
import ContactFormEmail from '@/email/contact-form-email.component'
import { isValidString } from '@/utils/isValidString.util'
import { getErrorMessage } from '@/utils/getErrorMessage.util'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
  const email = formData.get('email')
  const message = formData.get('message')

  if (!isValidString(email, 500)) return { error: 'invalid sender email' }
  if (!isValidString(message, 5000)) return { error: 'invalid message' }

  try {
    await resend.emails.send({
      from: 'contact form <onboarding@resend.dev>',
      to: 'fadytgk@gmail.com',
      subject: 'tring resend',
      reply_to: email as string,
      // text: message,
      react: createElement(ContactFormEmail, {
        message: message as string,
        email: email as string,
      }),
    })
  } catch (error) {
    return { error: getErrorMessage(error) }
  }

  return {}
}
