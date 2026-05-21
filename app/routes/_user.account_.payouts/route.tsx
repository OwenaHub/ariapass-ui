import { useEffect, useState } from 'react';
import { Form, useOutletContext, useNavigation, useFetcher, redirect, type MetaFunction } from 'react-router';

import { Button } from "~/components/ui/button"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from "~/components/ui/combobox";
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import type { Route } from '../_user.account_.payouts/+types/route';
import { toast } from 'sonner';
import { RiArrowDownSLine, RiCheckLine, RiInformation2Line, RiLoader4Line } from '@remixicon/react';
import type { VerifiedAccount } from '~/types/VerifiedAccount';
import { requireUser } from '~/lib/auth.server';
import type { Bank } from '~/types/Bank';
import { getBankList, verifyAccount } from '~/handlers/paystack';
import { setUpPayout } from '~/handlers/organiser/profile';
import { handleActionError } from '~/lib/logger.server';
import { withMsg } from '~/lib/redirector';
import BackButton from '~/components/custom/back-button';
import { defaultMeta } from '~/lib/meta';

const defaultBank = {
    id: null,
    name: "Test bank",
    slug: "test-bank",
    code: "001",
    longcode: "",
    gateway: null,
    pay_with_bank: false,
    supports_transfer: true,
    available_for_direct_debit: false,
    active: false,
    country: "",
    currency: "",
    type: "",
    is_deleted: false,
    createdAt: "",
    updatedAt: ""
};

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "My Profile | AriaPass" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const user: User = await requireUser(request);

    try {
        if (user.organiserProfile?.paystackSubaccountCode)
            return { banks: [defaultBank] };

        const response = await getBankList(request, { country: 'nigeria' });

        return { banks: response || [defaultBank] };
    } catch (error) {
        handleActionError(error)
        return { banks: [defaultBank] };
    }
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.clone().formData();
    const intent = formData.get("intent");

    if (intent === "verify_account") {
        const accountNumber = formData.get("accountNumber") as string;
        const bankCode = formData.get("bankCode") as string;

        try {
            const data: any = await verifyAccount(request, { accountNumber, bankCode });

            return { success: true, account: data.data };
        } catch (error: any) {
            return {
                success: false,
                error: error?.response?.data?.message || error?.message || "Verification failed"
            };
        }
    }

    if (intent === "setup_payout") {
        try {
            const response = await setUpPayout(request, 'organiser-profile/setup-payout');

            if (!response?.success) {
                throw new Error(response?.data?.message || "Unable to setup payout");
            }

            // Redirect on success to refresh data and clear form state
            return redirect(withMsg('/account/payouts', 'success', 'action_success'));

        } catch (error: any) {
            handleActionError(error);
            return redirect(withMsg('/account/payouts', 'error', 'action_failed'));
        }
    }

    return null;
}

export default function Payouts({ loaderData, actionData }: Route.ComponentProps) {
    const { banks } = loaderData;
    const user: User = useOutletContext();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const fetcher = useFetcher();
    const isVerifying = fetcher.state !== "idle" && fetcher.formData?.get("intent") === "verify_account";

    const verifiedAccount: VerifiedAccount | undefined = fetcher.data?.success
        ? fetcher.data?.account
        : undefined;

    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [accountNumber, setAccountNumber] = useState<string>("");

    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            fetcher.submit(
                {
                    intent: "verify_account",
                    accountNumber,
                    bankCode: selectedBank.code
                },
                { method: "post" }
            );
        }
    }, [accountNumber, selectedBank]);

    useEffect(() => {
        if (fetcher.data && !fetcher.data.success && fetcher.data.error) {
            toast.error("Account verification failed", {
                description: fetcher.data.error
            });
        }
    }, [fetcher.data]);

    useEffect(() => {
        if (actionData && !actionData.success && actionData.error) {
            toast.error("Failed to setup payout", {
                description: actionData.error
            });
        }
    }, [actionData]);

    return (
        <div className='container'>
            <div>
                <BackButton />
            </div>
            {user.organiserProfile?.paystackSubaccountCode ? (
                <div>
                    <div className='mb-4'>
                        <h2 className='font-bold tracking-tight text-sm'>
                            Your Payout Account
                        </h2>
                        <p className='text-xs'>
                            Reach out to <span className='text-blue-500'>hello@ariapass.africa</span> to change this account
                        </p>
                    </div>

                    <div className='bg-slate-50 mt-6 px-4 py-6 rounded border flex flex-col md:flex-row md:items-start gap-6'>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-sm font-semibold'>Bank Name</Label>
                            <p className='text-sm'>
                                {user.organiserProfile?.bankName || "N/A"}
                            </p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-sm font-semibold'>Account Number</Label>
                            <p className='text-sm'>
                                {user.organiserProfile?.accountNumber || "N/A"}
                            </p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-sm font-semibold'>Account Name</Label>
                            <p className='text-sm'>
                                {user.organiserProfile?.accountName || "N/A"}
                            </p>
                        </div>
                    </div>

                    <div className='mt-4 text-xs text-gray-600'>
                        You currently pay {" "}
                        <span className='font-bold'>{user.organiserProfile.commissionRate}%</span>{" "}
                        commission on ticket sales. <br />

                        Partners sell at <span className='font-bold tracking-tight'>0%</span>— Contact sales via{" "}
                        <a href="mailto:ticketmaster@ariapass.africa" className='text-blue-500 underline underline-offset-2'>
                            email
                        </a>
                        {" "}or{" "}
                        <a href="tel:+2348026658956" className='text-blue-500 underline underline-offset-2'>
                            phone
                        </a>
                    </div>
                </div>
            ) : (
                <Form method="post">
                    {/* Define the intent for the final form submission */}
                    <input type="hidden" name="intent" value="setup_payout" />

                    <div className="bg-slate-0 rounded gap-3 flex items-start">
                        <RiInformation2Line size={18} className='mt-1 text-blue-500' />
                        <div className='text-primary'>
                            <h2 className='font-bold tracking-tighter text-sm'>
                                Add Account
                            </h2>
                            <p className='text-xs'>
                                Add a Nigerian bank account to receive payouts.
                            </p>
                        </div>
                    </div>

                    <div className='bg-slate-50 mt-6 px-4 py-6 rounded border flex flex-col md:flex-row md:items-start gap-6'>
                        <div className='flex flex-col gap-1'>
                            <Label className='text-sm'>Select Bank</Label>
                            <Combobox
                                items={banks}
                                onValueChange={(value: Bank | null) => {
                                    setSelectedBank(value);
                                }}
                            >
                                <ComboboxTrigger
                                    render={
                                        <Button type="button" variant="outline" className="w-full md:w-74 rounded py-4.5 justify-between font-normal">
                                            {selectedBank ? selectedBank.name : "Select a bank..."}
                                            <RiArrowDownSLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    }
                                />

                                <ComboboxContent>
                                    <ComboboxInput showTrigger={false} placeholder="Search" />
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item}
                                            >
                                                {item.name}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>

                            {/* Hidden inputs needed by your API for the final setup_payout submission */}
                            <input type="hidden" name="settlement_bank" value={selectedBank?.code || ""} />
                            <input type="hidden" name="business_name" value={user?.organiserProfile?.organiserName || ""} />
                            <input type="hidden" name="percentage_charge" value={0} />
                            <input type="hidden" name="bank_name" value={selectedBank?.name || ""} />
                            <input type="hidden" name="account_name" value={verifiedAccount?.account_name || ""} />
                        </div>

                        {/* Account Number Input */}
                        <div className='flex flex-col gap-1'>
                            <Label className='text-sm'>Account Number</Label>
                            <Input
                                name='account_number'
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="000000000"
                                maxLength={10}
                                minLength={10}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none"
                                spellCheck="false"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    const remaining = 10 - input.value.length;
                                    const counter = document.getElementById("account-number-counter");
                                    if (counter) counter.textContent = `${remaining} characters left`;
                                }}
                            />
                            <div id="account-number-counter" className="ms-1 text-xs text-gray-500">
                                10 characters left
                            </div>
                        </div>

                        {/* Verification Loading / Success State Area */}
                        <div className='md:self-center'>
                            {isVerifying && (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <RiLoader4Line className="h-4 w-4 animate-spin" />
                                    <p className="text-xs">Verifying...</p>
                                </div>
                            )}

                            {!isVerifying && verifiedAccount && (
                                <div className="flex items-center gap-2">
                                    <p className="text-sm tracking-tight font-medium">
                                        {verifiedAccount.account_name}
                                    </p>
                                    <RiCheckLine className='text-green-500' strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className=' mt-8'>
                        <Button
                            type="submit"
                            disabled={!(accountNumber.length === 10 && selectedBank && !isSubmitting && verifiedAccount)}
                            className="w-full md:w-auto"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit account'}
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    )
}