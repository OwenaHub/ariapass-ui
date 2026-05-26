import { RiArrowRightSLine } from '@remixicon/react';
import { Link } from 'react-router'
import { Text } from '~/components/ui/text';

export default function OrganiserProfileStatus({ user }: { user: User }) {
    if (user.organiserProfile?.status === 'pending') {
        const hasPayoutSetup = Boolean(user.organiserProfile?.paystackSubaccountCode);

        return (
            <div className='bg-amber-50 text-amber-700 p-2 flex items-center rounded justify-between'>
                <Text.small>
                    Your profile is being reviewed
                </Text.small>

                <div className="w-auto">
                    {hasPayoutSetup ? (
                        <Link
                            to="/account"
                            className=" md:w-auto flex items-center justify-center px-2 py-1 text-xs bg-amber-200/50 text-amber-900 transition-colors"
                        >
                            View Profile
                        </Link>
                    ) : (
                        <Link
                            to="/account/payouts"
                            className="w-fit rounded flex items-center justify-center px-2 py-1 text-xs bg-amber-600 text-white transition-colors animate-pulse"
                        >
                            <span>Setup Payouts</span>
                            <RiArrowRightSLine className="size-4" />
                        </Link>
                    )}
                </div>
            </div>
        );
    } else if (user.organiserProfile?.status === 'suspended') {
        return (
            <div className='bg-red-50 text-red-700 p-2 rounded'>
                <Text.small className='font-semibold'>
                    Your organiser profile has been suspended
                </Text.small>
                <Text.small>
                    Contact support to via <a href="tel:+2348026658956" className="underline text-blue-500">
                        0802 6658 956
                    </a> to resolve this issue
                </Text.small>
            </div>
        );
    }
}
