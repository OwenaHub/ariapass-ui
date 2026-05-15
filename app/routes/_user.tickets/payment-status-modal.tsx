import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';

const TITLES = [
    "Booking confirmed! 🎉",
    "You’ve locked in your spot! 🔒",
    "That’s a wrap—your ticket’s ready! 🎟️",
    "Boom! You’re on the guest list 😎",
    "All set for the big day! 🥳"
];

const DESCRIPTIONS = [
    "Get ready for an unforgettable experience!",
    "Your adventure starts soon—don’t be late ⏰",
    "Can’t wait to see you at the event!",
    "You're officially part of the excitement 💃🕺",
    "You should buy for a friend too"
];

export default function PaymentStatusModal() {
    const [params, setParams] = useSearchParams();

    const randomIndex = useMemo(() => {
        if (String(params.get('message')) === 'Approved') {
            return Math.floor(Math.random() * TITLES.length);
        }
        return 0;
    }, [params.get('message')]);

    return (
        <>
            {String(params.get('message')) === 'Approved' && (
                <Dialog open={true} onOpenChange={() => {
                    const newParams = new URLSearchParams(params);
                    newParams.delete('message');
                    setParams(newParams);
                }}>
                    <DialogContent className='bg-theme outline-2 outline-offset-4 outline-primary-theme rounded-4xl py-10'>
                        <DialogHeader className='text-start md:text-center mb-5'>
                            <DialogTitle className='text-white text-center font-bold text-2xl md:text-3xl text-pretty mb-5 tracking-tight'>
                                {TITLES[randomIndex]}
                            </DialogTitle>
                            <DialogDescription>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-base text-center md:text-xl text-white'>
                                        {DESCRIPTIONS[randomIndex]}
                                    </p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}