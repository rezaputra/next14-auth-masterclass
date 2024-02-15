"use client"

import { UseCurrentRole } from "@/hooks/use-current-rule"
import { UserRole } from "@prisma/client"
import { FormError } from "../form-error"

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

function RoleGate({ children, allowedRole }: RoleGateProps) {
    const role = UseCurrentRole()
    if (role !== allowedRole) {
        return <FormError message="You don't have permission to view this content!" />
    }

    return <>{children}</>
}

export default RoleGate
