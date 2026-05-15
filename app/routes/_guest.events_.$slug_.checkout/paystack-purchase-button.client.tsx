import { PaystackButton } from "react-paystack"
import { useState, useEffect } from 'react'
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useSubmit, useNavigation, useActionData } from "react-router";
import { PAYSTACK_PUBK } from "~/config/defaults";
import { Button } from "~/components/ui/button"
import { ButtonGroup } from "~/components/ui/button-group"
import { RiAddLine, RiSubtractLine, RiLoader4Line } from "@remixicon/react";
import { calculatePaymentBreakdown } from "~/lib/checkout";

export default function PaystackPurchaseButton({ ticket, user, organiser }: {
    ticket: Ticket,
    user?: User | undefined,
    organiser: OrganiseProfile | undefined,
}) {
    const publicKey = PAYSTACK_PUBK;

    const submit = useSubmit();
    const navigation = useNavigation();
    const actionData = useActionData();

    const isSubmitting = navigation.state === "submitting";

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        quantity: 1,
        tickets: [{ id: ticket.id, quantity: 1 }]
    });

    const breakdown = calculatePaymentBreakdown({
        unitPrice: parseInt(ticket.price),
        quantity: form.quantity,
        commissionRate: parseInt(organiser?.commissionRate || "0"),
        processingFeeStrategy: organiser?.processingFeeStrategy,
    });

    const {
        processingFeeChargedToBuyer,
        commissionCharge,
        totalAmount,
    } = breakdown;

    useEffect(() => {
        if (actionData?.error) {
            toast.dismiss("payment-verification");
        }
    }, [actionData]);

    const componentProps = {
        email: form.email,
        amount: totalAmount * 100,
        subaccount: organiser?.paystackSubaccountCode,
        transaction_charge: commissionCharge * 100,
        metadata: {
            custom_fields: [
                { display_name: "Name", variable_name: "name", value: form.name },
                { display_name: "Phone", variable_name: "phone", value: form.phone },
                { display_name: "Quantity", variable_name: "quantity", value: form.quantity },
            ]
        },
        publicKey,
        text: isSubmitting ? "Verifying Payment..." : "Buy Now",

        onSuccess: (response: any) => {
            if (response.status !== "success") {
                toast.error("Payment failed", {
                    description: "Please try again later, or contact support——support@ariapass.africa"
                });
                return;
            }

            // toast.loading("Verifying your ticket...", { id: "payment-verification" });

            submit(
                {
                    reference: response.reference,
                    ticket_id: ticket.id,
                    purchaser_name: form.name,
                    purchaser_email: form.email,
                    quantity: form.quantity,
                    tickets: form.tickets,
                },
                {
                    method: "post",
                    encType: "application/json"
                }
            );
        },
        onClose: () => {
            toast.warning('Abandoning purchase, why?', {
                description: "Email ticketmaster@ariapass.africa if you need help."
            });
        },
    }

    return (
        <div className="animated fadeIn">
            <div className="mt-0">
                <form className="mb-5">
                    <div className="bg-indigo-100 border-b-2 border-indigo-300 rounded mb-6 flex items-stretch">
                        <div className="flex-1 p-3">
                            <div className="text-xs text-primary mb-3">
                                Buying <span className="font-bold uppercase">{ticket.name}</span> ticket @ <span className="font-bold">₦{(parseInt(ticket.price)).toLocaleString()}</span>
                            </div>

                            <div className="">
                                <div className="flex flex-col gap-2 mb-5">
                                    {/* Ticket Quantity */}
                                    <div className="flex-1 flex items-center justify-between border-b border-gray-300 bg-white text-primary p-2 rounded">
                                        <div>
                                            <div className="text-[11px] text-gray-500">Quantity</div>
                                            <div className="font-medium">
                                                {form.quantity} ticket{form.quantity > 1 && 's'}
                                            </div>
                                        </div>
                                        <div>
                                            <ButtonGroup orientation="horizontal" className="h-fit">
                                                <Button
                                                    disabled={form.quantity === 1 || isSubmitting}
                                                    className="mx-0.5 "
                                                    onClick={() => {
                                                        if (form.quantity === 1) return;
                                                        setForm((i) => ({
                                                            ...i,
                                                            quantity: i.quantity - 1,
                                                            tickets: i.tickets.map(t => ({ ...t, quantity: t.quantity - 1 }))
                                                        }))
                                                    }}
                                                    type='button'
                                                    variant="default"
                                                    size="sm"
                                                >
                                                    <RiSubtractLine />
                                                </Button>
                                                <Button
                                                    disabled={isSubmitting}
                                                    className="mx-0.5"
                                                    onClick={() => {
                                                        setForm((i) => ({
                                                            ...i,
                                                            quantity: i.quantity + 1,
                                                            tickets: i.tickets.map(t => ({ ...t, quantity: t.quantity + 1 }))
                                                        }))
                                                    }}
                                                    type="button"
                                                    variant="default"
                                                    size="sm"
                                                >
                                                    <RiAddLine />
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>

                                    {organiser?.processingFeeStrategy !== "organiser_pays" && (
                                        <div className="flex-1 text-sm items-center border-b border-gray-300 bg-white text-primary p-2 rounded">
                                            <div className="text-[11px] text-gray-500">Processing Fee</div>
                                            <div className="font-medium">
                                                ₦{processingFeeChargedToBuyer.toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="leading-2">
                                        <div className="text-[11px]">Total</div>
                                        <div className='text-xl font-bold text-theme'>
                                            ₦{totalAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1">
                            <Label className="mb-1 text-xs" htmlFor="name">Name</Label>
                            <Input
                                className="disabled:opacity-50"
                                type="text"
                                id="name"
                                placeholder="First Last"
                                value={form.name}
                                onChange={(e) => setForm((i) => ({ ...i, name: e.target.value }))}
                                disabled={Boolean(user?.id) || isSubmitting}
                            />
                        </div>
                        <div className="flex-1">
                            <Label className="mb-1 text-xs" htmlFor="email">Email</Label>
                            <Input
                                className="disabled:opacity-50"
                                type="text"
                                id="email"
                                placeholder="your@email.com"
                                value={form.email}
                                onChange={(e) => setForm((i) => ({ ...i, email: e.target.value }))}
                                disabled={Boolean(user?.id) || isSubmitting}
                            />
                        </div>
                    </div>

                    <Label className="mb-1 text-xs">
                        Phone <small className="text-[10px]">(11 digit phone)</small>
                    </Label>
                    <Input
                        className="disabled:opacity-50"
                        type="text"
                        id="phone"
                        placeholder="0800 000 0000"
                        maxLength={11}
                        onChange={(e) => setForm((i) => ({ ...i, phone: e.target.value }))}
                        disabled={isSubmitting}
                    />
                </form>

                <div className="relative w-full pt-4">
                    <PaystackButton
                        {...componentProps}
                        disabled={form.email.length < 5 || form.phone.length < 11 || isSubmitting}
                        className="flex items-center rounded justify-center w-full px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap select-none cursor-pointer transition-all duration-75 outline-none disabled:pointer-events-none disabled:opacity-50 bg-linear-to-b from-[#303030] to-[#1a1a1a] [inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_2px_0_0_#000000] active:translate-y-0.5 active:[inset_0_1px_0_rgba(255,255,255,0.15),_0_0_0_1px_#000000,_0_0px_0_0_#000000] hover:opacity-90"
                    />

                    {isSubmitting && (
                        <div className="absolute inset-y-0 left-1/2 -translate-x-24 flex items-center justify-center pointer-events-none">
                            <RiLoader4Line className="animate-spin text-white w-5 h-5" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}