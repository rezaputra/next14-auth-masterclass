import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
const domain_email = process.env.EMAIL_ADDRESS

export async function sendTwoFactorEmail(email: string, token: string) {
    await resend.emails.send({
        from: domain_email as string,
        to: email,
        subject: "2FA code",
        html: `<p>Your 2FA code: ${token}</p>`,
    })
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: domain_email as string,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here </a>to reset your password</p>`,
    })
}

export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: domain_email as string,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here </a>to confirm email</p>`,
    })
}
