import { PaystackButton } from 'react-paystack'

export default function EventUpgradeButton({ isSubmitting, componentProps }: { isSubmitting: boolean, componentProps: any }) {
    return (
        <div>
            <PaystackButton
                className="flex items-center justify-center w-full px-4.5 py-2 text-xs whitespace-nowrap select-none rounded cursor-pointer transition-all duration-75 outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-linear-to-b from-[#625DF5] to-[#4F4AD9] text-white shadow-[inset_0_2.5px_0_rgba(255,255,255,0.2),0_0_0_1px_#3A36A8,0_2px_0_0_#3A36A8] active:not-aria-[haspopup]:translate-y-0.5 active:not-aria-[haspopup]:shadow-[inset_0_2px_2px_rgba(0,0,0,0.3),0_0_0_1px_#3A36A8,0_0px_0_0_#3A36A8] disabled:translate-y-0.5 disabled:shadow-[inset_0_2px_2px_rgba(0,0,0,0.3),0_0_0_1px_#3A36A8,0_0px_0_0_#3A36A8] hover:opacity-90"
                disabled={isSubmitting}
                {...componentProps}
            />
        </div>
    )
}
