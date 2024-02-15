import { auth } from "@/auth"
import UserInfo from "@/components/user-info"
import { currentUser } from "@/lib/auth"

async function ServerPage() {
    const user = await currentUser()
    return <UserInfo user={user} label="🖥 Server component" />
}

export default ServerPage
