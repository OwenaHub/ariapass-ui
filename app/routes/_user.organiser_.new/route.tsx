import { Button } from "~/components/ui/button";
import OpeningPage from "./opening-page";
import CompanyName from "./company-name";
import { Form, redirect, useNavigation, useSearchParams, type MetaFunction } from "react-router";
import CompanyBio from "./company-bio";
import CompanyContact from "./company-contact";
import { parseForm } from "~/lib/utils";
import type { Route } from "../_user.organiser_.new/+types/route";
import { defaultMeta } from "~/lib/meta";
import { RiArrowLeftLine } from "@remixicon/react";
import { getOrganiserProfile, updateOrganiserProfile } from "~/handlers/organiser/profile";
import InputError from "~/components/custom/input-error";
import { handleActionError } from "~/lib/logger.server";
import Stepper from "~/components/custom/stepper";
import { withMsg } from "~/lib/redirector";
import { requireUser } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    ...defaultMeta({
        title: "Become an Organiser | AriaPass",
        description: "Become an organiser on AriaPass.",
    }),
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const user = await requireUser(request);

    if (user.organiserProfile?.status === 'active') {
        return redirect(withMsg(
            '/home', 'warning', 'action_failed'
        ))
    } else if (user.organiserProfile?.status === 'suspended') {
        return redirect(withMsg(
            '/home', 'warning', 'no_active_profile'
        ))
    }

    const res = await getOrganiserProfile(request, 'organiser-profile');
    const url = new URL(request.url);
    const step = url.searchParams.get("step") || "1";
    return { step, profile: res };
}

export async function action({ request }: Route.ActionArgs) {
    const credentials = await parseForm(request);

    const url = new URL(request.url);
    const step = url.searchParams.get("step") || "1";
    const newSearchParams = new URLSearchParams(url.searchParams);

    if (Object.keys(credentials).length === 0) {
        newSearchParams.set('step', (parseInt(step) + 1).toString());
        return redirect(`${url.pathname}?${newSearchParams.toString()}`);
    }

    try {
        await updateOrganiserProfile(request, 'organiser-profile');

        if (step !== "4") {
            newSearchParams.set('step', (parseInt(step) + 1).toString());
            return redirect(`${url.pathname}?${newSearchParams.toString()}&success=step_done`);
        }

        return redirect(withMsg('/home', 'info', 'profile_submitted'))
    } catch (error: any) {
        return handleActionError(error)
    }
}

export default function OrganiserRequest({ loaderData, actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const { step, profile } = loaderData;

    const isSubmitting = navigation.state === "submitting";

    return (
        <Form className="py-16 container" method="post">
            {step !== "1" && (
                <div className=" pb-5">
                    <Stepper
                        steps={[
                            'Welcome', 'Name', 'Biography', 'Contact'
                        ]}
                        currentStep={Number(step)}
                    />
                </div>
            )}
            <div>
                {step > "1" && (
                    <div className="flex items-stretch justify-between mb-8">
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            type="button"
                            onClick={() => {
                                const currentStep = parseInt(step);
                                const newSearchParams = new URLSearchParams(searchParams);
                                newSearchParams.set('step', (currentStep - 1).toString());
                                window.location.search = newSearchParams.toString();
                            }}
                            className="cursor-pointer"
                        >
                            <RiArrowLeftLine size={14} />
                            <span>Back</span>
                        </Button>
                    </div>
                )}

                {/* Render forms based on the URL step */}
                <div className="w-auto">
                    {step === "1" && <OpeningPage />}
                    {step === "2" && <CompanyName profile={profile} />}
                    {step === "3" && <CompanyBio profile={profile} />}
                    {step === "4" && <CompanyContact profile={profile} />}
                </div>
            </div>

            <div className="mt-5">
                <InputError for="organiser_name" error={actionData?.errors} />
                <InputError for="bio" error={actionData?.errors} />
                <InputError for="currency" error={actionData?.errors} />
                <InputError for="contact_phone" error={actionData?.errors} />
                <InputError for="contact_email" error={actionData?.errors} />
                <InputError for="city" error={actionData?.errors} />
                <InputError for="country" error={actionData?.errors} />
            </div>

            <div className="mt-10 text-center">
                {step === "4"
                    ? (
                        <Button
                            size={"lg"}
                            className="mt-5 w-50! cursor-pointer"
                            disabled={isSubmitting}
                        >
                            <span>Submit Request</span>
                        </Button>
                    )
                    : (
                        <Button
                            className="mt-5 w-50! cursor-pointer"
                            variant={"brand"}
                            size={"lg"}
                            disabled={isSubmitting}
                        >
                            Continue
                        </Button>
                    )
                }
            </div>
        </Form>
    );
}
