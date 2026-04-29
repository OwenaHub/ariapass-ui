import { Form, Link, useNavigation, useSearchParams, type MetaFunction } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import type { Route } from "../_auth.login/+types/route";
import { defaultMeta } from '~/lib/meta';
import { Button } from "~/components/ui/button";
import InputError from "~/components/custom/input-error";
import authenticate from "~/handlers/authentication";
import { handleActionError } from "~/lib/logger.server";
import { useEffect } from "react";

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Forgot Password | AriaPass" },
    ];
}

export async function action({ request }: Route.ClientActionArgs) {
    try {
        const res = await authenticate(request, 'forgot-password');
        return {
            status: "sent",
            message: res.status
        };
    } catch (error: any) {
        return handleActionError(error);
    }
}

export default function ForgotPassword({ actionData }: Route.ComponentProps) {
    const formStatus: any = actionData;

    const [searchParams] = useSearchParams();

    if (formStatus?.status === "sent") {
        searchParams.set("status", "sent");
        window.history.replaceState({}, "", `?${searchParams}`);
    }

    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";

    useEffect(() => {
        if (actionData?.message) {
            toast.info(actionData.status, {
                description: actionData?.message,
            });
        }
    }, [actionData]);

    return (
        <section className="container animated fadeIn relative">
            <div className="justify-center gap-10 items-center max-w-sm md:flex mx-auto py-10">
                <div className="pt-20">
                    <div className="z-10 h-full rounded-xl md:px-8 py-6">
                        <div className="text-center pb-5">
                            <p className="text-2xl text-primary font-medium tracking-tighter">
                                Forgot your password?
                            </p>
                        </div>

                        {searchParams.get("status") === "sent"
                            ? (
                                <div className="mt-7">
                                    <p className="mb-8 text-sm">
                                        Check your email for a link to reset your password.
                                        If you don't see it, check your spam folder or {" "}
                                        <Link to={"#"} className="font-bold underline" onClick={() => searchParams.delete("status")}>try again</Link>.
                                    </p>
                                    <Button
                                        onClick={() => {
                                            window.open("https://mail.google.com", "_blank");
                                        }}
                                        type="button"
                                        disabled={busy}
                                        variant={'secondary'}
                                        size={"lg"}
                                        className="cursor-pointer w-full uppercase"
                                    >
                                        Open email
                                    </Button>
                                </div>
                            )
                            : (
                                <Form method="POST">
                                    <div className="mb-5">
                                        <Label className="text-xs pb-1">Email address</Label>
                                        <Input
                                            className="bg-white/10 backdrop-blur-3xl py-6 rounded-lg text-sm placeholder:text-sm border border-gray-200"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="mozart@email.com"
                                            required
                                        />
                                        <InputError for="email" error={formStatus?.errors} />
                                    </div>

                                    <div className="mt-7">
                                        <Button
                                            disabled={busy}
                                            size={"lg"}
                                            className="w-full cursor-pointer"
                                        >
                                            Send Email
                                        </Button>
                                    </div>
                                </Form>
                            )}

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
