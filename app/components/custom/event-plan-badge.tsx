import { RiFlashlightLine, RiShieldCheckLine, RiStarFill } from "@remixicon/react";

export default function EventPlanBadge({ tier }: { tier?: string }) {
    const normalizedTier = tier?.toUpperCase() || 'BASIC';

    const configs: Record<string, { label: string; classes: string; icon: any }> = {
        BASIC: {
            label: 'Free Tier',
            classes: 'bg-gray-100 text-gray-600 border-gray-200',
            icon: <RiFlashlightLine className="h-3 w-3" />
        },
        STANDARD: {
            label: 'Standard',
            classes: 'bg-indigo-50 text-theme',
            icon: <RiStarFill className="h-3 w-3 fill-current" />
        },
        PREMIUM: {
            label: 'Premium',
            classes: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent',
            icon: <RiShieldCheckLine className="h-3 w-3" />
        },
        ELITE: {
            label: 'Elite',
            classes: 'bg-orange-500 text-white border-transparent',
            icon: <RiStarFill className="h-3 w-3" />
        }
    };

    const config = configs[normalizedTier] || configs.BASIC;

    return (
        <div className={`flex items-center gap-1 p-0.5 pr-1.5 rounded text-[10px] font-bold uppercase w-max ${config.classes}`}>
            {config.icon}
            {config.label}
        </div>
    );
};