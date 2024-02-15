"use client"

import { logout } from "@/actions/logout"

interface LoginButtonProps {
    children?: React.ReactNode
}

function LogoutButton({ children }: LoginButtonProps) {
    const onClicked = () => {
        logout()
    }

    return (
        <span onClick={onClicked} className=" cursor-pointer">
            {children}
        </span>
    )
}

export default LogoutButton
