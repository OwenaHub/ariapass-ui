import type { Route } from "../_guest.events_.$slug/+types/route";
import { toast } from "sonner";
import { redirect } from "react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import dayjs from "dayjs";
import { to12HourFormat } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { QRCode } from "react-qr-code";
import { getEventProgram } from "~/handlers/user/misc";
import { RiCalendarLine, RiQrCodeLine, RiShareForwardLine, RiTimeLine } from "@remixicon/react";
import { withMsg } from "~/lib/redirector";

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const event: any | OrganiserEvent = await getEventProgram(request, `events/${params.slug}/program`);

        if (!event.eventProgram || event.eventProgram.length === 0) {
            return redirect(withMsg(
                `/events/${params.slug}`, 'warning', 'action_failed'
            ));
        }
        return { event }
    } catch (error: any) {
        toast.error("Something went wrong", {
            description: `Status code ${error.status} - Unable to load resource`
        });
        return redirect('/')
    }
}

export default function EventProgram({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;
    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    const handleShare = async () => {
        const shareData = {
            title: `${event.title} - Event Program`,
            text: `Check out the official program for ${event.title}.`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <div className="relative min-h-screen bg-white pb-24 font-sans">

            {/* Clean Editorial Header */}
            <section className="w-full pt-12 pb-10 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6 border border-gray-200">
                        Official Program
                    </div>
                    <h1 className="text-3xl md:text-5xl font-medium  tracking-tight text-gray-900 mb-6 leading-tight">
                        {event.title}
                    </h1>
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 text-sm font-medium'>
                        <div className="flex items-center gap-1.5">
                            <RiCalendarLine size={18} className="text-theme" />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
                        <div className="flex items-center gap-1.5">
                            <RiTimeLine size={18} className="text-theme" />
                            <span>{to12HourFormat(event.startTime)}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Content */}
            <section className="w-full bg-white pt-10">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl pb-10">

                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Event Itinerary</h2>
                        <p className="text-sm text-gray-500 mt-1">Tap an item to view details.</p>
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        defaultValue={`item-0`}
                        className="w-full flex flex-col gap-4"
                    >
                        {event?.eventProgram && event.eventProgram[0].programItems.map((programItem, index) => (
                            <AccordionItem
                                key={programItem.id}
                                value={`item-${index}`}
                                // Strictly using 'rounded' as requested
                                className="border border-gray-200 rounded px-4 md:px-6 bg-white hover:border-gray-300 transition-colors data-[state=open]:border-theme/40 data-[state=open]:shadow-sm"
                            >
                                <AccordionTrigger className="hover:no-underline py-5">
                                    <div className="flex items-center gap-4 text-left">
                                        {/* Timeline Node Number */}
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-gray-50 border border-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className="text-base font-semibold text-gray-900 tracking-tight">
                                            {programItem.title}
                                        </span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="pb-6 pl-12">
                                    {programItem.description ? (
                                        <div
                                            className="prose prose-sm max-w-none text-gray-600 prose-p:leading-relaxed prose-headings:font-bold prose-a:text-theme prose-a:no-underline hover:prose-a:underline"
                                            dangerouslySetInnerHTML={{ __html: programItem.description }}
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">No additional details provided.</span>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Premium Floating Navigation Pill */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 p-1.5 bg-gray-900/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-800">
                    <QRCodeModal event={event} />
                    <div className="w-px h-5 bg-gray-700" />
                    <Button
                        variant={'ghost'}
                        onClick={handleShare}
                        className="rounded-full text-white hover:bg-gray-800 hover:text-white px-5"
                    >
                        <RiShareForwardLine className="w-4 h-4 mr-2" />
                        <span className="font-medium text-sm">Share Program</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function QRCodeModal({ event }: { event: OrganiserEvent }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex text-white items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 transition">
                    <RiQrCodeLine size={18} />
                    <span className="text-sm">QR</span>
                </button>
            </DialogTrigger>

            <DialogContent className="border border-white/10 text-primary max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg">
                        Scan to View
                    </DialogTitle>
                    <DialogDescription className="text-center text-primary">
                        Instantly access this event program
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-center">
                    <div className="p-4 bg-white rounded border">
                        <QRCode
                            size={200}
                            value={`https://ariapass.africa/events/${event.slug}/program`}
                        />
                    </div>
                </div>

                <p className="text-center text-[9px] text-gray-400 uppercase">
                    Powered by AriaPass
                </p>
            </DialogContent>
        </Dialog>
    );
}