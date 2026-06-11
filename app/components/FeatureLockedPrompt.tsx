import { Link } from 'react-router';
import { RiLockUnlockFill, RiVipCrown2Fill, RiArrowRightLine } from '@remixicon/react';
import { Button } from './ui/button';

interface FeatureLockedPromptProps {
    featureName: string;
    eventSlug: string;
    neededTier?: string;
}

export default function FeatureLockedPrompt({ featureName, eventSlug, neededTier }: FeatureLockedPromptProps) {
    return (
        <div className="relative w-full overflow-hidden rounded border border-indigo-500/20 bg-gray-900 text-white shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/30 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative p-8 md:p-10 text-center flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6 shadow-inner">
                    <RiVipCrown2Fill className="h-8 w-8 text-amber-400" />
                </div>

                <h3 className="text-2xl tracking-tight mb-3">
                    Unlock {featureName}
                </h3>

                <p className="text-indigo-100/80 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                    You have reached the limit of your current plan. Upgrade your event to access advanced tools, scale your audience, and deliver a premium experience.
                </p>

                <Link to={`/my-events/${eventSlug}/upgrade${neededTier ? `?needed=${neededTier}&feature=${featureName}` : ''}`} className="w-full sm:w-auto">
                    <Button
                        size="lg"
                        variant={"secondary"}
                    >
                        <RiLockUnlockFill className="w-5 h-5 text-indigo-600 mr-2" />
                        View Upgrade Options
                        <RiArrowRightLine className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}