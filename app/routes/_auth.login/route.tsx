import { Form, Link, redirect, type MetaFunction } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEffect, useState } from "react";
import type { Route } from "../_auth.login/+types/route";
import { defaultMeta } from '~/lib/meta';
import SlideShow from "~/components/cards/slide-show";
import { commitSession, getSession } from "~/session.server";
import authenticate from "~/handlers/authentication";
import { handleActionError } from "~/lib/logger.server";
import HrWithText from "~/components/custom/hr-with-text";
import { RiEye2Line, RiEyeCloseLine } from "@remixicon/react";
import { Button } from "~/components/ui/button";
import GoogleAuthButton from "~/components/custom/google-auth-button";
import InputError from "~/components/custom/input-error";
import { Text } from "~/components/ui/text";
import { toast } from "sonner";

export const meta: MetaFunction = (args) => {
  return [
    ...defaultMeta(args) || [],
    { title: "Login | AriaPass" },
  ];
}

export async function action({ request }: Route.ClientActionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const res = await authenticate(request, 'login');

    session.set("token", res.token);
    session.set("user", res.user);

    return redirect('/home', {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error: any) {
    return handleActionError(error);
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (actionData?.message) {
      toast.error(actionData.message, {
        description: actionData?.status,
      });
    }
  }, [actionData]);

  return (
    <section className="flex items-stretch h-screen animated fadeIn">
      <div className="basis-3/7 m-4 rounded hidden md:block bg-gray-100 relative overflow-hidden group">
        <SlideShow />
      </div>

      {/* Right side */}
      <div className="flex-1 justify-center items-center md:flex mx-auto overflow-y-auto">
        <div className="flex-1 z-10 container max-w-xl">
          <header className="flex items-center justify-between mb-10 pt-20 md:pt-16">
            <Link to={'/'}>
              <img width="60" className="z-5 inline-block" src="/images/logos/app_logo.png" title="AriaPass" />
            </Link>
            <Link to={'/register'} className="z-5 text-primary text-sm underline underline-offset-2">
              Register
            </Link>
          </header>

          <div className="pb-8 flex flex-col gap-6">
            <Text.h2>
              Log in
            </Text.h2>
            <Text.p>
              Welcome, enter your details to login AriaPass.
            </Text.p>
          </div>

          <GoogleAuthButton text="Log in" />

          <HrWithText text="Or use password" />

          <Form method="POST">
            <div className="mb-5">
              <Label className="text-xs pb-1">Email address</Label>
              <Input
                className="bg-white/10 backdrop-blur-3xl"
                id="email"
                type="email"
                name="email"
                placeholder="mozart@email.com"
                required
              />
              <InputError for="email" error={actionData?.errors} />
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center pb-1">
                <Label className="text-xs">Password</Label>
                <Link to="/forgot-password" className="text-primary text-xs underline underline-offset-2">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  className="bg-white/10 backdrop-blur-3xl pr-12"
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
              <InputError for="password" error={actionData?.errors} />
            </div>
            <div className="mt-7">
              <Button size={'lg'}>
                Continue
              </Button>
            </div>
          </Form>

          <div className="flex flex-col gap-3">
            <p className="p-5 mt-5 text-center text-pretty text-xs font-light">
              By continuing, you agree to our {" "}
              <Link to="/terms-of-use">Terms</Link>
              {" "}and{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </section >
  )
}
