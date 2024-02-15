"use server"

import bcrypt from "bcryptjs"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import { User } from "next-auth"
import * as z from "zod"

export async function settings(values: z.infer<typeof SettingsSchema>) {
    const user = (await currentUser()) as User

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user?.id as string)

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user?.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values?.email as string)

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in user!" }
        }

        const verificationToken = await generateVerificationToken(values.email)

        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Verification email sent!" }
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if (!passwordMatch) return { error: "Incorrect password" }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)

        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
        },
    })

    return { success: "Settings updated" }
}
