import { RiFlashlightLine, RiShieldFill, RiStarFill, RiStarLine } from "@remixicon/react";
import { TIER_LIMITS } from "~/lib/static.data";

export const plans = {
    BASIC: {
        name: "Basic",
        icon: <RiFlashlightLine className="h-6 w-6 text-slate-400" />,
        color: "border-slate-200",
        bg: "bg-slate-50",
        price: "₦0",
        amount: TIER_LIMITS.BASIC.price,
        perks: ["1 Collaborator", "3 Ticket Tiers", "24/7 Support"]
    },
    STANDARD: {
        name: "Standard",
        icon: <RiStarLine className="h-6 w-6 text-theme" />,
        color: "border-indigo-200",
        bg: "bg-white",
        price: `₦${TIER_LIMITS.STANDARD.price.toLocaleString()}`,
        amount: TIER_LIMITS.STANDARD.price,
        perks: ["5 Collaborators", "5 Ticket Tiers", "Digital Program"]
    },
    PREMIUM: {
        name: "Premium",
        icon: <RiShieldFill className="h-6 w-6 text-purple-600" />,
        color: "border-indigo-500",
        bg: "bg-white",
        price: `₦${TIER_LIMITS.PREMIUM.price.toLocaleString()}`,
        amount: TIER_LIMITS.PREMIUM.price,
        perks: ["15 Collaboratorss", "8 Ticket Tiers", "Digital Program", "Priority Support"]
    },
    ELITE: {
        name: "Elite",
        icon: <RiStarFill className="h-6 w-6 text-orange-500" />,
        color: "border-purple-500",
        bg: "bg-white",
        price: `₦${TIER_LIMITS.ELITE.price.toLocaleString()}`,
        amount: TIER_LIMITS.ELITE.price,
        perks: ["More Collaboratorss", "Banner Design", "Export Audience Data", "Priority Support"]
    }
};