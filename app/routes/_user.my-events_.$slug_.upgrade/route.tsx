import { redirect, useSearchParams, useSubmit, useNavigation, useActionData, type MetaFunction, Link } from "react-router";
import { defaultMeta } from "~/lib/meta";
import type { Route } from "../_user.my-events_.$slug/+types/route";
import { toast } from "sonner";
import { PAYSTACK_PUBK } from "~/config/defaults";
import { plans } from "~/components/custom/pricing";
import type { TIER_LIMITS } from "~/lib/static.data";
import { RiStarLine, RiVipCrownFill } from "@remixicon/react";
import { requireUser } from "~/lib/auth.server";
import { getOrganiserEvent } from "~/handlers/organiser/events";
import { useEffect, lazy, Suspense } from "react";
import { APIRequest } from "~/service/api-request";
import { handleActionError } from "~/lib/logger.server";
import BackButton from "~/components/custom/back-button";

const EventUpgradeButton = lazy(() => import("./event-upgrade-button.client"));

const TIER_ORDER = ["BASIC", "STANDARD", "PREMIUM", "ELITE"];

const pillColors = [
    "bg-green-50 border-green-100 text-green-700",
    "bg-violet-50 border-violet-100 text-violet-700",
    "bg-orange-50 border-orange-100 text-orange-700",
    "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700",
    "bg-purple-50 border-purple-100 text-purple-700"
];

export const meta: MetaFunction = (args: any) => {
    if (!args.data?.event) {
        return [
            { title: "AriaPass - Discover the community behind the concerts" },
        ];
    }
    const event = args.data.event;
    return [
        ...defaultMeta(),
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
    const neededTier = searchParams.get("needed") as keyof typeof TIER_LIMITS | null;
    const featureName = searchParams.get("feature");

    const currentTier = (event?.eventPlan?.tier?.toUpperCase() || 'BASIC') as keyof typeof TIER_LIMITS;
    const currentTierIndex = TIER_ORDER.indexOf(currentTier);

    const submit = useSubmit();
    const actionData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (actionData?.error) {
            toast.dismiss("upgrade-verification");
            toast.error("Upgrade Failed", {
                description: actionData.error || "Contact hello@ariapass.africa"
            });
        }
    }, [actionData]);

    const handleSuccess = (response: any, targetData: any) => {
        if (response.status !== "success") {
            toast.error("Payment failed", { description: "Please try again later." });
            return;
        }
        // toast.loading("Applying your upgrade...", { id: "upgrade-verification" });
        submit(
            {
                reference: response.reference,
                tier_name: targetData.name.toUpperCase(),
                feature_snapshot: JSON.stringify(targetData.perks),
                amount_paid: targetData.amount,
            },
            { method: "post", encType: "application/json" }
        );
    };

    return (
        <div className="container w-full max-w-4xl mx-auto py-6 px-4 md:px-8">
            <div className="mb-8">
                <BackButton />
            </div>

            <div className="text-center mx-auto mb-10 md:mb-16">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-3">
                    Scale your event.
                </h1>
                <p className="text-sm px-6 md:text-base text-gray-500">
                    {featureName
                        ? <>To unlock <strong className="text-theme">{featureName}</strong>, select an eligible plan below.</>
                        : "Choose the perfect toolset for your audience. Upgrade once, use forever for this event."}
                </p>
            </div>

            {/* Horizontal List Container */}
            <div className="flex flex-col gap-6">
                {TIER_ORDER.map((tierKey, index) => {
                    const data = plans[tierKey as keyof typeof plans];
                    const isCurrent = currentTier === tierKey;
                    const isDowngrade = index < currentTierIndex;
                    const isRecommended = neededTier === tierKey;

                    const componentProps = {
                        email: user?.email || "",
                        amount: data.amount * 100,
                        metadata: { custom_fields: [{ display_name: "Name", variable_name: "name", value: user.name }] },
                        publicKey: PAYSTACK_PUBK,
                        text: isSubmitting ? "Wait..." : `Get ${data.name}`,
                        onSuccess: (res: any) => handleSuccess(res, data),
                        onClose: () => toast.warning('Purchase cancelled.'),
                    };

                    return (
                        <div
                            key={tierKey}
                            className={`relative flex flex-row items-center gap-3 md:gap-6 p-4 md:p-6 rounded transition-all duration-300 bg-white text-primary! ${isRecommended
                                ? 'border border-theme bg-theme-bg/50!'
                                : 'border border-gray-200 hover:border-gray-300'
                                } ${isDowngrade ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                        >
                            {isRecommended && (
                                <div className="absolute -top-2.5 left-4 md:left-6 bg-theme text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md z-10">
                                    <RiStarLine size={10} /> Recommended
                                </div>
                            )}

                            {/* Info & Perks Wrapper */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 min-w-0">

                                {/* Identity & Price */}
                                <div className="shrink-0 md:w-44 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
                                    <div className="flex items-center gap-1.5 md:mb-1">
                                        {isRecommended ? (
                                            <RiVipCrownFill className="text-amber-400 size-4 md:size-5 shrink-0" />
                                        ) : (
                                            <div className="[&>svg]:size-4 md:[&>svg]:size-5 text-gray-700 shrink-0">{data.icon}</div>
                                        )}
                                        <h3 className="text-lg tracking-tight uppercase">{data.name}</h3>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg md:text-2xl font-bold tracking-tighter leading-none">
                                            {data.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Pilled Perks Section */}
                                {/* min-w-0 and overflow-x-auto allows the pills to scroll horizontally on small screens */}
                                <div className="flex-1 min-w-0 relative">
                                    <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar pr-4 pb-1">
                                        <strong className="shrink-0 text-[10px] md:text-xs font-bold tracking-tight text-primary">
                                            {tierKey === 'BASIC' ? 'Includes:' : 'Plus:'}
                                        </strong>

                                        {data.perks.map((perk, i) => {
                                            // Cycle through the colors array based on the index
                                            const colorClass = pillColors[i % pillColors.length];

                                            return (
                                                <span
                                                    key={i}
                                                    className={`shrink-0 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-medium border whitespace-nowrap ${colorClass}`}
                                                >
                                                    {perk}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="shrink-0 w-24 md:w-36 h-9 md:h-11">
                                {isCurrent ? (
                                    <div className="w-full h-full flex items-center justify-center rounded bg-gray-100 text-gray-500 font-bold uppercase tracking-widest text-[9px] md:text-xs">
                                        Active
                                    </div>
                                ) : isDowngrade ? (
                                    <div className="w-full h-full flex items-center justify-center rounded bg-gray-50 text-gray-400 font-bold uppercase tracking-widest text-[9px] md:text-xs">
                                        Included
                                    </div>
                                ) : (
                                    <Suspense fallback={<div className="w-full h-full bg-gray-200 animate-pulse rounded" />}>
                                        <div className={`[&>button]:w-full [&>button]:h-full [&>button]:rounded [&>button]:font-bold [&>button]:text-[10px] md:[&>button]:text-sm [&>button]:transition-all ${isRecommended
                                            ? '[&>button]:bg-white [&>button]:text-gray-900 [&>button]:hover:bg-gray-200'
                                            : '[&>button]:bg-theme [&>button]:text-white [&>button]:hover:bg-theme/90'
                                            }`}>
                                            <EventUpgradeButton isSubmitting={isSubmitting} componentProps={componentProps} />
                                        </div>
                                    </Suspense>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Link to="/organisers/#feature-matrix" className="w-fit mx-auto block text-center mt-8 text-xs underline underline-offset-2">
                See more details
            </Link>
        </div>
    );
}