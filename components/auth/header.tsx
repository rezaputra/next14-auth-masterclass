import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

interface HeaderProps {
    label: string
}

function Header({ label }: HeaderProps) {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center">
            <h1 className={(cn("text-3xl font-semibold"), font.className)}>Auth</h1>
            <p className=" text-muted-foreground text-sm">{label}</p>
        </div>
    )
}

export default Header
