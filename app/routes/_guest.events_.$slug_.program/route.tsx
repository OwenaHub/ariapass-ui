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
import { FormatLineBreak } from "~/components/custom/format-line-break";
import { RiCalendarLine, RiQrCodeLine, RiShareLine } from "@remixicon/react";
import { withMsg } from "~/lib/redirector";

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const event: any | OrganiserEvent = await getEventProgram(request, `events/${params.slug}/program`);

        if (!event.eventProgram || event.eventProgram.length === 0) {
            return redirect(withMsg(
                `/events/${params.slug}`, 'warning', 'action_failed'
            ))
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

    return (
        <div className="relative">
            <section
                className="container sticky top-0 py-18 h-80 bg-primary-theme flex flex-col justify-between"
                style={{
                    backgroundImage: `linear-gradient(360deg, #625DF5, #625DF5aa), url('/images/logos/alt_logo.png')`,
                    backgroundSize: 'cover, 100%',
                    backgroundPosition: 'center, center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div />
                <div className="text-white">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-5">{event.title}</h1>
                    <div className='text-white flex items-center gap-2 tracking-tighter font-medium'>
                        <RiCalendarLine size={18} />
                        <span className='text-normal'>{formattedDate}</span> — {" "}
                        <span className="text-primary font-semibold tracking-tighter">
                            {to12HourFormat(event.startTime)}
                        </span>
                    </div>
                </div>
            </section>

            <section className="container pt-14 bg-white relative -top-10 rounded-t-3xl">
                <Accordion
                    type="single"
                    collapsible
                    defaultValue={`item-0`}
                    className=" bg-gray-50 rounded-lg"
                >
                    {event?.eventProgram && event.eventProgram[0].programItems.map((programItem, index) => (
                        <AccordionItem key={programItem.id} value={`item-${index}`} className="px-5">
                            <AccordionTrigger className="text-sm tracking-tighter">
                                <div>
                                    <span className="font-bold inline-block me-1">{index + 1}.{" "} </span>
                                    <span> {programItem.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs">
                                {programItem.description
                                    ? (
                                        <div
                                            className="text-xs prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold"
                                            dangerouslySetInnerHTML={{ __html: programItem.description }}
                                        />
                                    )
                                    : <span className="text-gray-400 text-xs italic">No content</span>}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Navigation Menu */}
            <div className="p-1.5 shadow-lg bg-white/35 backdrop-blur-xs rounded w-max fixed bottom-10 z-50 left-1/2 -translate-x-1/2">
                <section className="flex items-center gap-2">
                    <QRCodeModal event={event} />
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            const shareData = {
                                title: event.title,
                                text: event.description,
                                url: window.location.href
                            };
                            navigator.share(shareData);
                        }}
                    >
                        <RiShareLine className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                            Share
                        </span>
                    </Button>
                </section>
            </div>
        </div>
    )
}

export function QRCodeModal({ event }: { event: OrganiserEvent }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        variant={'secondary'}
                    >
                        <RiQrCodeLine className='size-5' />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm pb-20 rounded-3xl">
                    <DialogHeader className='pb-7'>
                        <DialogTitle>Scan QR</DialogTitle>
                        <DialogDescription>
                            Scan with your camera to access the event program.
                        </DialogDescription>
                    </DialogHeader>

                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 250, width: "100%" }}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`https://ariapass.africa/events/${event.slug}/program`}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

