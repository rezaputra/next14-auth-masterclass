"use-client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import BackButton from "./back-button"
import Header from "./header"
import Social from "./social"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

function CardWrapper({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: CardWrapperProps) {
    return (
        <Card className=" w-[400px] shadow-md bg-slate-200">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardHeader>{children}</CardHeader>
            {showSocial && (
                <CardContent>
                    <Social />
                </CardContent>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper
