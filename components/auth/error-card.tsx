import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import CardWrapper from "./card-wrapper"

function ErrorCard() {
    return (
        <CardWrapper
            headerLabel="Oops! something went wrong"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center  items-center">
                <ExclamationTriangleIcon className=" text-destructive" />
            </div>
        </CardWrapper>
    )
}

export default ErrorCard
