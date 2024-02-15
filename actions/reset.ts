"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"

export async function reset(values: z.infer<typeof ResetSchema>) {
    const validateFields = ResetSchema.safeParse(values)

    if (!validateFields.success) return { error: "Invalid email!" }

    const { email } = validateFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) return { error: "Email not found!" }

    // TODO: Generate token & send email
    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return { success: "Reset email sent!" }
}
