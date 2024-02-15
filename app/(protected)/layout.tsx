import Navbar from "./_components/navbar"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className=" h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-t from-sky-400 to-blue-800">
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout
