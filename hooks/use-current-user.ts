import { useSession } from "next-auth/react"

function useCurrentUser() {
    const session = useSession()

    return session.data?.user
}

export default useCurrentUser
