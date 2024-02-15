"use server"

import { signOut } from "@/auth"

export async function logout() {
    // TODO: Some server stuff

    await signOut()
}
