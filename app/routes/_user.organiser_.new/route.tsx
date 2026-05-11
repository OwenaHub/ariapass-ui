import { Button } from "~/components/ui/button";
import OpeningPage from "./opening-page";
import CompanyName from "./company-name";
import { Form, Link, redirect, useNavigation, useSearchParams, type MetaFunction } from "react-router";
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

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Become an Organiser | AriaPass" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const res = await getOrganiserProfile(request, 'organiser-profile');
    const url = new URL(request.url);
    const step = url.searchParams.get("step") || "1";
    return { step, profile: res };
}

export async function action({ request }: Route.ActionArgs) {
    const credentials = await parseForm(request.clone());

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

        return redirect('/home?info=profile_submitted')
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
            <div className="md:hidden block pb-5">
                <Stepper
                    steps={[
                        'Welcome', 'Name', 'Biography', 'Contact'
                    ]}
                    currentStep={Number(step)}
                />
            </div>
            <div className="flex gap-20 items-stretch justify-between">
                <div className="lg:basis-6/10">
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
                    <div className="max-w-3xl">
                        {step === "1" && <OpeningPage />}
                        {step === "2" && <CompanyName profile={profile} />}
                        {step === "3" && <CompanyBio profile={profile} />}
                        {step === "4" && <CompanyContact profile={profile} />}
                    </div>
                </div>
                <div className="hidden flex-1 lg:flex flex-col gap-4 text-sm">
                    <Link to={"?step=1"} className={`${step === "1" ? 'font-semibold bg-gray-100 rounded-lg' : ''} p-2`}>
                        Getting started
                    </Link>
                    <Link to={"?step=2"} className={`${step === "2" ? 'font-semibold bg-gray-100 rounded-lg' : ''} p-2`}>
                        1. Company name
                    </Link>
                    <Link to={"?step=3"} className={`${step === "3" ? 'font-semibold bg-gray-100 rounded-lg' : ''} p-2`}>
                        2. Company Biography
                    </Link>
                    <Link to={"?step=4"} className={`${step === "4" ? 'font-semibold bg-gray-100 rounded-lg' : ''} p-2`}>
                        3. Company Information
                    </Link>
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

            <div className="mt-10">
                {step === "4"
                    ? (
                        <Button
                            size={"lg"}
                            className="mt-5 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            <span>Submit Request</span>
                        </Button>
                    )
                    : (
                        <Button
                            className="mt-5 cursor-pointer"
                            variant={"secondary"}
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
