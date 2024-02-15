"use client"

import { useSession } from "next-auth/react"

export function UseCurrentRole() {
    const session = useSession()

    return session.data?.user?.role
}
