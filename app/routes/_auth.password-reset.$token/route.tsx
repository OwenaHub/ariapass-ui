import { Form, Link, redirect, useSearchParams, type MetaFunction } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import type { Route } from "../_auth.password-reset.$token/+types/route";
import { defaultMeta } from '~/lib/meta';
import InputError from "~/components/custom/input-error";
import authenticate from "~/handlers/authentication";
import { handleActionError } from "~/lib/logger.server";
import { RiEye2Line, RiEyeCloseLine } from "@remixicon/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Reset Password | AriaPass" },
    ];
}

export async function action({ request }: Route.ClientActionArgs) {
    try {
        await authenticate(request, 'reset-password');
        return redirect('/login?reset_status=passed');
    } catch (error: any) {
        return handleActionError(error);
    }
}

export default function Login({ actionData, params }: Route.ComponentProps) {
    const [showPassword, setShowPassword] = useState(false);

    const [searchParams, _] = useSearchParams();

    return (
        <section className="container animated fadeIn">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="flex-1">
                    <div className="z-10 h-full rounded-xl md:px-8 px-5 py-6">
                        <div className="text-center pb-8">
                            <p className="text-2xl text-primary font-medium tracking-tight">
                                Reset Your Password
                            </p>
                            <p className="text-sm font-light mt-2 text-secondary-foreground">
                                Password reset for <span className="font-semibold">{searchParams.get("email")}</span>.
                            </p>
                        </div>

                        <Form method="POST">
                            <input type="hidden" name="token" value={params.token} />
                            <input
                                type="hidden"
                                name="email"
                                value={searchParams.get('email') as string}
                            />

                            <div className="mb-5">
                                <div className="pb-1">
                                    <Label className="text-xs">New password</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        className="pr-12"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword
                                            ? <RiEye2Line className="text-pretty h-5 w-5" />
                                            : <RiEyeCloseLine className="text-pretty h-5 w-5" />
                                        }
                                    </button>
                                </div>
                                <InputError for="email" error={actionData?.errors} />
                                <InputError for="password" error={actionData?.errors} />
                            </div>

                            <div className="mb-5">
                                <div className="pb-1">
                                    <Label className="text-xs">Confirm password</Label>
                                </div>
                                <div className="relative">
                                    <Input
                                        className="pr-12"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-7">
                                <Button size={"lg"}>
                                    Reset Password
                                </Button>
                            </div>
                        </Form>

                        <div className="flex flex-col gap-3">
                            <p className="p-5 text-center text-pretty text-xs font-light">
                                By continuing, you agree to our {" "}
                                <Link to="/terms-of-service">Terms</Link>
                                {" "}and{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                    <div className="text-foreground text-sm py-5 flex items-center gap-1 justify-center">
                        <span>Need an account? </span>
                        <Link to="/register" className="text-primary-theme underline underline-offset-2" viewTransition>Register</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
