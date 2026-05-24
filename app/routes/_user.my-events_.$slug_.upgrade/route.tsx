import { redirect, useSearchParams, useSubmit, useNavigation, useActionData, type MetaFunction, Link } from "react-router";
import { defaultMeta } from "~/lib/meta";
import type { Route } from "../_user.my-events_.$slug/+types/route";
import { toast } from "sonner";
import { PAYSTACK_PUBK } from "~/config/defaults";
import { plans } from "~/components/custom/pricing";
import type { TIER_LIMITS } from "~/lib/static.data";
import { RiArrowDownLine, RiArrowRightLine, RiCheckboxCircleLine, RiLoader4Line } from "@remixicon/react";
import { requireUser } from "~/lib/auth.server";
import { getOrganiserEvent } from "~/handlers/organiser/events";
import { useEffect, lazy, Suspense } from "react";
import { APIRequest } from "~/service/api-request";
import { handleActionError } from "~/lib/logger.server";
import BackButton from "~/components/custom/back-button";

const EventUpgradeButton = lazy(() => import("./event-upgrade-button.client"));

export const meta: MetaFunction = (args: any) => {
    if (!args.data?.event) {
        return [
            { title: "AriaPass - Discover the community behind the concerts" },
        ];
    }
    const event = args.data.event;
    return [
        ...defaultMeta(args) || [],
        { title: `${event.title} upgrade | AriaPass` },
    ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const res: OrganiserEvent = await getOrganiserEvent(request, `organiser/events/${params.slug}`);
        const user: User = await requireUser(request);

        return { event: res, user: user }
    } catch (error: any) {
        handleActionError(error);
        return redirect('/my-events?error=event_not_found');
    }
}

export async function action({ request, params }: Route.ActionArgs) {
    try {
        const req = new APIRequest(request);

        const data = await request.json();

        await req.patch(`/api/organiser/events/${params.slug}/upgrade`, {
            reference: data.reference,
            currency: "NGN",
            payment_method: "paystack",
            tier_name: data.tier_name,
            feature_snapshot: data.feature_snapshot,
            amount_paid: data.amount_paid,
            status: "active",
        });

        return redirect(`/my-events/${params.slug}?success=upgrade_complete&`);

    } catch (error: any) {
        handleActionError(error)
        return {
            error: error?.data?.message || "Upgrade verification failed. Please contact support."
        };
    }
}

export default function EventUpgrade({ loaderData }: Route.ComponentProps) {
    const { event, user }: any = loaderData;

    const [searchParams] = useSearchParams();
    const targetTier = searchParams.get("tier") as keyof typeof TIER_LIMITS;
    const currentTier = (event?.eventPlan?.tier?.toUpperCase() || 'BASIC') as keyof typeof TIER_LIMITS;

    const currentData = plans[currentTier];
    const targetData = plans[targetTier];

    const submit = useSubmit();
    const actionData = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (actionData?.error) {
            toast.dismiss("upgrade-verification");
            toast.error("Upgrade Failed", {
                description: actionData.error || "Contact ticketmaster@ariapass.africa"
            });
        }
    }, [actionData]);

    const publicKey = PAYSTACK_PUBK;

    const componentProps = {
        email: user?.email || "",
        amount: targetData.amount * 100,
        metadata: {
            custom_fields: [
                { display_name: "Name", variable_name: "name", value: user.name },
            ]
        },
        publicKey,
        text: isSubmitting ? "Verifying Upgrade..." : "Upgrade Now",

        onSuccess: (response: any) => {
            if (response.status !== "success") {
                toast.error("Payment failed", {
                    description: "Please try again later, or contact support——support@ariapass.africa"
                });
                return;
            }

            toast.loading("Applying your upgrade...", { id: "upgrade-verification" });

            submit(
                {
                    reference: response.reference,
                    tier_name: targetData.name.toUpperCase(),
                    feature_snapshot: JSON.stringify(targetData.perks),
                    amount_paid: targetData.amount,
                },
                {
                    method: "post",
                    encType: "application/json"
                }
            );

            toast.dismiss("upgrade-verification");
        },
        onClose: () => {
            toast.warning('Abandoning purchase, why?', {
                description: "Email ticketmaster@ariapass.africa if you need help."
            });
        },
    }

    return (
        <div className="container w-full max-w-5xl mx-auto py-6">
            <div className="mb-6">
                <BackButton />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">

                {/* Current Plan Card */}
                <div className={`w-full max-w-sm rounded border-2 ${currentData.color} ${currentData.bg}  opacity-70 grayscale-[0.5] p-5`}>
                    <div className="flex items-center gap-3 mb-6">
                        {currentData.icon}
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Current Plan</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{currentData.name}</h2>
                    <p className="text-gray-500 text-sm mb-8 italic">Your current active setup</p>

                    <ul className="space-y-4">
                        {currentData.perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-600 mb-2 text-sm">
                                <RiCheckboxCircleLine className="h-4 w-4 text-gray-300" />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* The Transition Arrow */}
                <div className="flex items-center justify-center bg-indigo-50 rounded-full p-4 md:rotate-0 rotate-90 shadow-inner">
                    <RiArrowRightLine className="size-8 text-theme animate-pulse hidden md:inline-block" />
                    <RiArrowDownLine className="size-6 text-theme animate-pulse inline-block md:hidden" />
                </div>

                {/* Target Plan Card */}
                <div className={`w-full max-w-sm rounded border border-theme bg-white p-5 shadow-xl shadow-indigo-100 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 bg-theme text-white px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-tight">
                        Recommended Upgrade
                    </div>

                    <div className="flex items-center gap-3 my-5">
                        {targetData.icon}
                        <span className="text-sm font-bold uppercase tracking-widest text-theme">New Potential</span>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-1">{targetData.name}</h2>
                    <div className="flex items-start gap-1 mb-8">
                        <span className="text-4xl font-black text-theme">{targetData.price}</span>
                        <span className="text-gray-500 text-xs font-bold mt-1">/ event</span>
                    </div>

                    <ul className="space-y-4 mb-10">
                        {targetData.perks.map((perk, i) => (
                            <li key={i} className="flex items-center mb-2 gap-3 text-gray-900 text-sm font-semibold">
                                <div className="bg-emerald-100 rounded-full p-0.5">
                                    <RiCheckboxCircleLine className="h-4 w-4 text-emerald-600" />
                                </div>
                                {perk}
                            </li>
                        ))}
                    </ul>

                    <div className="relative">
                        <Suspense
                            fallback={<div className="w-full h-14 bg-gray-200 animate-pulse rounded-2xl"></div>}
                        >
                            <EventUpgradeButton isSubmitting={isSubmitting} componentProps={componentProps} />
                        </Suspense>

                        {isSubmitting && (
                            <div className="absolute inset-y-0 left-1/2 -trangray-x-24 flex items-center justify-center pointer-events-none">
                                <RiLoader4Line className="animate-spin text-white w-5 h-5" />
                            </div>
                        )}
                    </div>

                    <p className="text-center mt-4 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        Instant unlock via Paystack
                    </p>
                </div>

            </div>
        </div>
    )
}