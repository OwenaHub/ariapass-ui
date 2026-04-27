import { Form, Link, redirect, useSearchParams, type MetaFunction } from "react-router";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import GoogleAuthButton from "~/components/custom/google-auth-button";
import HrWithText from "~/components/custom/hr-with-text";
import InputError from "~/components/custom/input-error";
import type { Route } from "../_auth.register/+types/route";
import { defaultMeta } from '~/lib/meta';
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { BrSm } from "~/components/ui/line-break";
import { RiArrowLeftSLine, RiEye2Line, RiEyeCloseLine } from "@remixicon/react";
import authenticate from "~/handlers/authentication";
import SlideShow from "~/components/cards/slide-show";
import { Text } from "~/components/ui/text";
import { handleActionError } from "~/lib/logger.server";
import { commitSession, getSession } from "~/services/session.server";

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Register | AriaPass" },
    ];
}

export async function action({ request }: Route.ClientActionArgs) {
    try {
        const session = await getSession(request.headers.get("Cookie"));
        const res = await authenticate(request, 'register');

        session.set("token", res.token);
        session.set("user", res.user);

        return redirect('/dashboard?entry=new', {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch (error: any) {
        return handleActionError(error);
    }
}

export default function Register({ actionData }: Route.ComponentProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (actionData?.message) {
            toast.error("Something is missing", {
                description: actionData.message,
            });
        }
    }, [actionData]);

    return (
        <section className="flex items-stretch h-screen animated fadeIn">
            <div className="basis-3/7 m-4 rounded hidden md:block bg-gray-100 relative overflow-hidden group">
                <SlideShow />
            </div>

            <div className="flex-1 justify-center items-center md:flex mx-auto overflow-y-auto">
                <div className="flex-1 z-10 container max-w-xl">
                    <header className="flex items-center justify-between mb-10 pt-20 md:pt-16">
                        <Link to={'/'}>
                            <img
                                width="60"
                                className="z-10 inline-block"
                                src="/images/logos/app_logo.png"
                                title="AriaPass"
                            />
                        </Link>
                        <Link
                            to={'/login'}
                            className="z-5 text-primary text-sm underline underline-offset-2"
                        >
                            <span>Log in</span>
                        </Link>
                    </header>

                    <div className="pb-8 flex flex-col gap-6">
                        <Text.h2>
                            Get started
                        </Text.h2>
                        <Text.p>
                            Welcome to <span className="text-primary-theme font-bold">AriaPass</span>! Let's get started by <BrSm /> creating your account.
                        </Text.p>
                    </div>

                    {searchParams.get('auth_method') === 'password'
                        ? (
                            <Form method="POST" className="mt-5 flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <Label className="tracking-tight" htmlFor="name">Full name</Label>
                                        <Input
                                            className="bg-white/10 backdrop-blur-3xl"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="First Last"
                                            required
                                        />
                                        <InputError for="name" error={actionData?.errors} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label className="tracking-tight" htmlFor="email">Email</Label>
                                        <Input
                                            className="bg-white/10 backdrop-blur-3xl"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email@provider.com"
                                            required
                                        />
                                        <InputError for="email" error={actionData?.errors} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="tracking-tight" htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            className="bg-white/10 backdrop-blur-3xl pr-12"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="******"
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
                                    <InputError for="password" error={actionData?.errors} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label className="tracking-tight" htmlFor="password_confirmation">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            className="bg-white/10 backdrop-blur-3xl"
                                            id="password_confirmation"
                                            type={showPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            placeholder="******"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-between items-center gap-5">
                                    <Button
                                        size={'lg'}
                                        className="flex items-center gap-1 cursor-pointer"
                                        variant={'secondary'}
                                        onClick={() => setSearchParams("auth_method=0auth")}
                                    >
                                        <RiArrowLeftSLine />
                                        <span>Back</span>
                                    </Button>
                                    <Button size={'lg'}>
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <>
                                <GoogleAuthButton text="Register" />

                                <HrWithText text="Or" />

                                <Button
                                    size={'lg'}
                                    onClick={() => setSearchParams('auth_method=password')}
                                    type="button"
                                    className="w-full mt-3 tracking-tighter cursor-pointer"
                                >
                                    Register with password
                                </Button>
                            </>
                        )
                    }

                    <p className="p-6 mt-4 font-light text-center text-pretty text-xs">
                        By continuing, you agree to our {" "}
                        <Link to="/terms-of-use">Terms</Link>
                        {" "}and{" "}
                        <Link to="/privacy-policy">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </section>
    )
}
