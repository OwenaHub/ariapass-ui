import { Link } from 'react-router';
import { RiRocket2Fill, RiArrowRightLine } from '@remixicon/react';
import { Button } from '../ui/button';

interface EventUpgradeCardProps {
    eventSlug: string;
    title?: string;
    description?: string;
    ctaText?: string;
}

export default function EventUpgradeCard({
    eventSlug,
    title = "Upgrade this event",
}: EventUpgradeCardProps) {
    return (
        <div className="relative w-full overflow-hidden rounded border border-indigo-500/20 bg-gray-900 text-white shadow-2xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/30 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex items-center justify-between p-6 z-10">

                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                        <RiRocket2Fill className="size-5 text-amber-400" />
                    </div>

                    <h3 className="text-xl tracking-tight">
                        {title}
                    </h3>
                </div>

                <Link to={`/my-events/${eventSlug}/upgrade`}>
                    <Button
                        variant={"brand"}
                    >
                        <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}