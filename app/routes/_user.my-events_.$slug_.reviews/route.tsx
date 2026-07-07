import type { Route } from "../_user.my-events_.$slug/+types/route";
import { redirect, type MetaFunction } from "react-router";

import { defaultMeta } from '~/lib/meta';
import { getOrganiserEvent } from "~/handlers/organiser/events";
import { handleActionError } from "~/lib/logger.server";
import { RiStarFill, RiUser3Line, RiMessage2Line } from "@remixicon/react";
import { Text } from "~/components/ui/text";

export const meta: MetaFunction = (args: any) => {
    if (!args?.data?.event) {
        return [{ title: "Reviews | AriaPass" }];
    }
    return [
        ...defaultMeta({
            title: `${args.data.event.title} Reviews | AriaPass`,
        }),
    ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const res = await getOrganiserEvent(request, `organiser/events/${params.slug}`);
        return { event: res }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/my-events?error=action_failed')
    }
}

export default function OrganiserEventReviews({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent & { reviews?: EventReviews[] } } = loaderData;
    const reviews = event.reviews ?? [];

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviews).toFixed(1)
        : "0.0";

    return (
        <main className="max-w-4xl mx-auto px-4 py-10 font-sans text-slate-900">
            {/* Header section */}
            <div className="border-b border-slate-100 pb-6 mb-8">
                <span className="text-xs font-bold tracking-widest text-theme uppercase">
                    Event Analytics
                </span>
                <Text.h1 className="text-3xl tracking-tighter mt-1 mb-2">
                    {event.title}
                </Text.h1>
                <Text.p>
                    Manage and view authentic feedback submitted by verified ticket buyers.
                </Text.p>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded flex items-center justify-center border border-amber-100">
                        <RiStarFill className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tight">{averageRating} / 5.0</p>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Average Rating</p>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-6 rounded flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#625df5]/10 rounded flex items-center justify-center border border-[#625df5]/20">
                        <RiMessage2Line className="w-6 h-6 text-[#625df5]" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold tracking-tight">{totalReviews}</p>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Reviews</p>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                <Text.p className="mb-4">Attendee feedback</Text.p>

                {reviews.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-slate-200 rounded">
                        <p className="text-slate-400 text-sm font-light">No reviews submitted for this event yet.</p>
                    </div>
                ) : (
                    reviews.map((review, idx) => (
                        <div key={review.id ?? idx} className="p-6 border border-slate-200 rounded bg-white transition-all hover:border-slate-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 border border-slate-200 text-slate-600 rounded flex items-center justify-center text-sm font-bold">
                                        <RiUser3Line className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                                            {review.isAnonymous ? "Anonymous Attendee" : review.user?.name}
                                        </h4>
                                        {!review.isAnonymous && (
                                            <p className="text-xs text-slate-400 font-light">{review.user?.email}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Star Rating Visualizer */}
                                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-1 rounded w-max">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <RiStarFill
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-500" : "text-slate-200"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs font-black text-amber-700 ml-1">{review.rating}</span>
                                </div>
                            </div>

                            {/* Comment */}
                            <p className="text-slate-600 text-sm font-light leading-relaxed pl-1">
                                {review.comment || <span className="italic text-slate-400">Left rating without a written review.</span>}
                            </p>

                            {/* Visibility Badges */}
                            <div className="mt-4 pt-3 border-t border-slate-50 flex gap-2">
                                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${review.isPublic ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    {review.isPublic ? 'Visible to Public' : 'Private Note'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}