"use client"

import * as z from "zod"

import CardWrapper from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"

import { LoginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const uslError =
        searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already use with different provider" : ""

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset()
                        setError(data.error)
                    }
                    if (data?.success) {
                        form.reset()
                        setSuccess(data.success)
                    } else if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Two factor code</FormLabel>
                                            <FormControl className=" border-gray-300">
                                                <Input {...field} disabled={isPending} placeholder="123456" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {!showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl className=" border-gray-300">
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="email@example.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl className=" border-gray-300">
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <Button size="sm" variant={"link"} className="px-0  font-normal">
                                                <Link href="/auth/reset">Forgot password?</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || uslError} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
