import { Link } from 'react-router';
import { plans } from '../custom/pricing';
import { RiArrowRightLine, RiCheckboxCircleLine, RiLockLine } from '@remixicon/react';
import { Button } from '../ui/button';

interface UpgradePlanProps {
    targetTier: 'STANDARD' | 'PREMIUM' | 'BASIC';
    featureName?: string; // Optional: tell them exactly what they hit (e.g. "Ticket Tiers")
}

export default function UpgradePlan({ targetTier, featureName }: UpgradePlanProps) {
    // Ensuring we match the casing of your TIER_LIMITS keys
    const tierData: Record<'STANDARD' | 'PREMIUM' | 'BASIC', { price: string; perks: string[] }> = plans;

    const data = tierData[targetTier];

    return (
        <div className="max-w-sm mx-auto relative w-full overflow-hidden bg-white border border-slate-200 rounded animate-in fade-in zoom-in duration-300">
            {/* Header with Gradient */}
            <div className="bg-linear-to-br from-theme to-violet-700 p-6 flex flex-row items-center gap-10 text-white">
                <div className="relative">
                    <div className="absolute -inset-2 rounded bg-white/20 animate-pulse" />
                    <div className="relative bg-white p-2 rounded shadow-lg">
                        <RiLockLine className="h-6 w-6 text-theme" />
                    </div>
                </div>
                <h3 className="text-base font-semibold md:text-xl tracking-tighter">
                    Pay for this feature.
                </h3>
            </div>

            <div className="p-3">
                <div className="text-start mb-6">
                    <p className="text-slate-600 text-sm leading-relaxed tracking-tighter">
                        {featureName ? (
                            <>You need to buy <span className="font-bold text-slate-900">{featureName}</span> feature for this event.</>
                        ) : ("You've reached the limit for your current plan.")} {" "}
                        Upgrade to keep building your event.
                    </p>
                </div>

                {/* Benefits List */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Everything in {targetTier}:</p>
                    {data.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-3 text-slate-700">
                            <div className="bg-emerald-100 p-0.5 rounded-full">
                                <RiCheckboxCircleLine className="h-4 w-4 text-emerald-600 shrink-0" />
                            </div>
                            <span className="text-sm font-semibold">{perk}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <Link to={`upgrade?tier=${targetTier}`}>
                        <Button
                            type='button'
                            size={"lg"}
                            className='w-full'
                            onClick={() => console.log(`Initialize Paystack for ${targetTier}`)}
                        >
                            <span> PAY {data.price}</span> <RiArrowRightLine className="h-5 w-5 text-indigo-400" />
                        </Button>
                    </Link>
                    <p className="text-center mt-3 tracking-tight text-xs text-gray-500 font-light">
                        One-time payment per event • Secure via Paystack
                    </p>
                </div>
            </div>
        </div>
    );
}