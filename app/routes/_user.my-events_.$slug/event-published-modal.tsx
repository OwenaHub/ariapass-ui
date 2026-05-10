import { useSearchParams } from 'react-router';
import { useState, useEffect } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { RiCheckLine, RiFileCopyLine, RiSparklingFill } from '@remixicon/react';

interface EventPublishedModalProps {
    eventSlug?: string;
}

export default function EventPublishedModal({ eventSlug }: EventPublishedModalProps) {
    const [params, setParams] = useSearchParams();
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('https://ariapass.africa');

    const isOpen = params.get('status') === 'published';

    // Safely get the window origin on mount to avoid hydration mismatch
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const eventUrl = `${origin}/events/${eventSlug || ''}`;

    const closeModal = () => {
        setParams((prev) => {
            prev.delete('status');
            return prev;
        });
        setTimeout(() => setCopied(false), 300);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(eventUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeModal();
        }}>
            <DialogContent className="bg-white border-0 shadow-2xl p-0 overflow-hidden w-[calc(100vw-2rem)] sm:w-full max-w-md mx-auto flex flex-col max-h-[90vh]">

                {/* Decorative Header Banner (Unchanged, just added z-10 so it stays above the scroll) */}
                <div className="bg-linear-to-br from-indigo-700 to-theme h-28 sm:h-32 relative flex items-center justify-center shrink-0 z-10">
                    <div className="absolute top-4 left-6 w-3 h-3 bg-white/20 rounded-full" />
                    <div className="absolute bottom-6 right-8 w-4 h-4 bg-white/20 rounded-full" />
                    <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full" />

                    {/* Center Icon Badge */}
                    <div className="absolute -bottom-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center rotate-3">
                        <RiSparklingFill className="size-8 text-indigo-600 -rotate-3" strokeWidth={2.5} />
                    </div>
                </div>

                {/* 2. FIXED: Added `flex-1` and `overflow-y-auto`. If the screen is too small, ONLY this bottom section will scroll, keeping your banner pinned at the top! */}
                <div className="pt-12 pb-6 px-4 text-center flex flex-col flex-1 overflow-y-auto">

                    <DialogHeader className="mb-6 space-y-2">
                        <DialogTitle className="text-xl sm:text-2xl font-black text-primary">
                            Your event is live!
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                            Congratulations! Your event has been successfully published. Now it's time to spread the word and sell out those tickets.
                        </DialogDescription>
                    </DialogHeader>

                    {/* The Link Copy Box */}
                    <div className="mb-8 w-full">
                        <p className="text-sm font-bold text-primary text-left mb-2 ml-1">
                            Link to your event
                        </p>

                        {/* 3. FIXED: Added `overflow-hidden` here to guarantee the URL physically cannot break out of this box */}
                        <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl w-full max-w-full overflow-hidden">

                            {/* min-w-0 is the magic class that stops the URL from breaking the mobile layout */}
                            <div className="flex-1 min-w-0 px-2 sm:px-3">
                                {/* 4. FIXED: Added `block w-full` to ensure the truncate works flawlessly alongside select-all */}
                                <p className="block w-full text-xs sm:text-sm font-medium text-slate-600 truncate select-all">
                                    {eventUrl}
                                </p>
                            </div>

                            <Button
                                onClick={handleCopy}
                                variant="secondary"
                                className={`hidden md:flex shrink-0 transition-all duration-300 ${copied
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <RiCheckLine className="size-4" />
                                        <span className="hidden sm:inline">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <RiFileCopyLine className="size-4" />
                                        <span className="hidden sm:inline">Copy</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full mt-auto">
                        <Button
                            onClick={handleCopy}
                            className="w-full text-white shrink-0"
                            size={"lg"}
                        >
                            Copy Link & Share
                        </Button>
                        <Button
                            onClick={closeModal}
                            variant="ghost"
                            size={"lg"}
                            className="w-full text-slate-500 shrink-0"
                        >
                            Back to Dashboard
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}