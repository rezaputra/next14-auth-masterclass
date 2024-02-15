import crypto from "crypto"
import { getVerificationTokenByEmail } from "@/data/varification-token"
import { v4 as uuidV4 } from "uuid"
import { db } from "./db"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"

// export async function sendTwoFactorTokenEmail(email:string, token: string) {
//     await
// }

export async function generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 999_999).toString()
    // TODO: Later change to 15 minutes
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const existingToken = await getTwoFactorTokenByEmail(email)

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return twoFactorToken
}

export async function generatePasswordResetToken(email: string) {
    const token = uuidV4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({ where: { id: existingToken.id } })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return passwordResetToken
}

export async function generateVerificationToken(email: string) {
    const token = uuidV4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({ where: { id: existingToken.id } })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })

    return verificationToken
}
