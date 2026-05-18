import { RiArrowLeftLine, RiInformation2Line } from "@remixicon/react";
import { Form, Link, redirect, useOutletContext } from "react-router";
import InputError from "~/components/custom/input-error";
import ProfileStatus from "~/components/custom/profile-status";
import RevalidateButton from "~/components/custom/revalidate-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "../_auth.register/+types/route";
import { updateOrganiserProfile } from "~/handlers/organiser/profile";
import { withMsg } from "~/lib/redirector";
import { handleActionError } from "~/lib/logger.server";

export async function action({ request }: Route.ActionArgs) {
    try {
        await updateOrganiserProfile(request, 'organiser-profile')

        return redirect(withMsg(
            '/account/my-profile', 'success', 'action_success'
        ));
    } catch (error: any) {
        handleActionError(error);
        return redirect(withMsg(
            '/account/my-profile', 'error', 'action_failed'
        ));
    }
}

export default function MyProfile({ actionData }: Route.ComponentProps) {
    const user: User = useOutletContext();

    return (
        <div className="container">
            <Link to={'/account'}>
                <Button
                    className="mb-10"
                    variant={'secondary'}
                    size={"xs"}
                >
                    <RiArrowLeftLine />
                    <span>Back</span>
                </Button>
            </Link>

            <section>
                <div className='max-w-xl grid grid-cols-1 md:grid-cols-2 gap-5 mb-7'>
                    <div>
                        <Input
                            defaultValue={user.name}
                            name='name'
                            disabled
                        />
                    </div>
                    <div>
                        <Input
                            defaultValue={user.email}
                            name='email'
                            disabled
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 space-x-2 mb-10">
                    <Switch id="airplane-mode" checked disabled />
                    <Label htmlFor="airplane-mode text-xs">Enable promotional emails</Label>
                </div>
            </section>

            {user?.organiserProfile?.id && (
                <Form method='POST'>
                    <div className='mb-5 mt-12 flex items-center gap-3'>
                        <h2 className='tracking-tighter font-medium text-lg'>Organiser profile</h2>
                        <ProfileStatus status={user?.organiserProfile?.status!} />
                        <RevalidateButton />
                    </div>

                    <div className='bg-gray-50 p-5 rounded-xl flex flex-col gap-4'>
                        <div className='flex flex-col md:flex-row md:items-center gap-5 mb-5'>
                            <div className='flex-1'>
                                <Label className='mb-1 text-sm tracking-tight'>Business name</Label>
                                <Input
                                    placeholder='ACME Choral'
                                    name='organiser_name'
                                    maxLength={40}
                                    minLength={5}
                                    defaultValue={user?.organiserProfile?.organiserName || ''}
                                    required

                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        const remaining = 40 - input.value.length;
                                        const counter = document.getElementById("company-name-counter");
                                        if (counter) counter.textContent = `${remaining} characters left`;
                                    }}
                                />
                                <div id="company-name-counter" className="ms-2 text-xs text-gray-500 mt-1">
                                    40 characters left
                                </div>
                                <InputError for="organiser_name" error={actionData?.errors} />
                            </div>
                            <div className='flex-1'>
                                <Label className='mb-1 text-sm tracking-tight' htmlFor='phone'>Phone</Label>
                                <Input
                                    id='phone'
                                    placeholder='0800 000 0000'
                                    name='contact_phone'
                                    defaultValue={user?.organiserProfile?.contactPhone || ''}
                                    type='tel'
                                    maxLength={11}
                                    minLength={10}
                                    required

                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        const remaining = 11 - input.value.length;
                                        const counter = document.getElementById("phone-counter");
                                        if (counter) counter.textContent = `${remaining} characters left`;
                                    }}
                                />
                                <div id="phone-counter" className="ms-2 text-xs text-gray-500 mt-1">
                                    11 characters left
                                </div>
                                <InputError for="contact_phone" error={actionData?.errors} />
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row md:items-center gap-5 mb-5'>
                            <div className='flex-1'>
                                <Label className='mb-1 text-sm tracking-tight' htmlFor='website'>Website</Label>
                                <Input
                                    placeholder='https://acme.org'
                                    name='website_url'
                                    minLength={15}
                                    defaultValue={user?.organiserProfile?.websiteUrl || ''}
                                    id='website'
                                    type='url'
                                />
                                <InputError for="website_url" error={actionData?.errors} />
                            </div>
                            <div className='flex-1'>
                                <Label className='mb-1 text-sm tracking-tight' htmlFor='email'>Email</Label>
                                <Input
                                    placeholder='acme@choral.com'
                                    name='contact_email'
                                    minLength={15}
                                    defaultValue={user?.organiserProfile?.contactEmail || ''}
                                    id='email'
                                    type='email'
                                />
                                <InputError for="contact_email" error={actionData?.errors} />
                            </div>
                        </div>

                        <div>
                            <Label className='mb-1 text-sm tracking-tight'>Business name</Label>
                            <Textarea
                                rows={5}
                                cols={20}
                                placeholder='Amazing biography on ACME chorale...'
                                name='biography'
                                defaultValue={user.organiserProfile?.bio || ''}
                                maxLength={300}
                                minLength={10}
                                required

                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    const remaining = 300 - input.value.length;
                                    const counter = document.getElementById("bio-text-counter");
                                    if (counter) counter.textContent = `${remaining} characters left`;
                                }}
                            />
                            <div id="bio-text-counter" className="text-xs text-gray-500 mt-1">
                                300 characters left
                            </div>
                            <InputError for="biography" error={actionData?.errors} />
                        </div>
                    </div>

                    <p className="py-5 text-sm flex tracking-tighter items-center gap-1">
                        <RiInformation2Line className='size-4' />
                        <span>
                            See your payout bank details <Link className='text-blue-500' to={'/account/payouts'}>here</Link>
                        </span>
                    </p>

                    <div className='bg-gray-50 p-5 rounded-xl'>
                        <Label className='mb-1 text-sm tracking-tight' htmlFor='processing_fee_strategy'>
                            Processing fee strategy
                        </Label>
                        <p className="font-light tracking-tight text-xs mb-5">
                            <span>
                                Choose how you want to handle ticket processing fees. This will determine whether the ticket buyers or you, the organiser, will bear the cost of processing fees for each ticket sold.
                            </span>
                        </p>
                        <Select
                            required
                            name='processing_fee_strategy'
                            defaultValue={user.organiserProfile?.processingFeeStrategy || undefined}
                        >
                            <SelectTrigger className="w-full rounded max-w-lg">
                                <SelectValue placeholder="Select strategy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>How to handle processing fees</SelectLabel>
                                    {[
                                        'buyer_pays',
                                        'organiser_pays',
                                        'split_fee'
                                    ].map((state) => (
                                        <SelectItem
                                            key={state}
                                            value={state}
                                        >
                                            {state.charAt(0).toUpperCase() + state.slice(1).split('_').join(' ')}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='max-w-sm mt-8 text-sm'>
                        <Button>
                            Update profile
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    )
}
