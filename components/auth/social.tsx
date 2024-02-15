"use client"

import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"

function Social() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const onClicked = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    }
    return (
        <div className=" flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClicked("google")}>
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClicked("github")}>
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}

export default Social
