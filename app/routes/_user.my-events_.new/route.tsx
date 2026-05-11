import { Form, redirect, unstable_usePrompt, type MetaFunction } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Calendar } from "~/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import type { Route } from "../_user.my-events_.new/+types/route";
import { Switch } from "~/components/ui/switch";

import { defaultMeta } from '~/lib/meta';
import { eventCategory, nigerianStates } from "~/lib/static.data";
import InputError from "~/components/custom/input-error";
import { requireUser } from "~/lib/auth.server";
import { handleActionError } from "~/lib/logger.server";
import { RiArrowDownLine, RiFile4Line, RiMapLine, RiUserLocationLine } from "@remixicon/react";
import { createEvent } from "~/handlers/organiser/events";
import Stepper from "~/components/custom/stepper";
import { toast } from "sonner";

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "New Event | AriaPass" },
    ];
}

export async function loader({ request }: { request: Request }) {
    const user = await requireUser(request);

    try {
        const isOrganiser = user && user.organiserProfile?.status === 'active'

        if (!isOrganiser) {
            return redirect('/home?warning=no_active_profile');
        }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/home')
    }
}

export async function action({ request }: Route.ActionArgs) {
    try {
        const createdEvent: OrganiserEvent = await createEvent(request, 'organiser/events');
        return redirect(`/my-events/${createdEvent.slug}?success=event_created&tab=tickets`);
    } catch (error) {
        return handleActionError(error);
    }
}

interface FormProps {
    title: string,
    description: string,
    banner_url: File | null,
    event_type: string
    status: 'draft' | 'suspended' | 'cancelled' | 'completed' | 'published',
    engagement_visible: boolean,
    extra_info: string,
    venue_name: string,
    venue_address: string,
    city: string,
    country: string,
    start_time: Date | undefined,
}

/** Format a Date into 'YYYY-MM-DD' using **local** calendar. */
function toLocalYMD(d?: Date): string {
    return d
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`
        : "";
}

export default function CreateEvent({ actionData }: Route.ComponentProps) {
    const [openDate, setOpenDate] = useState(false)

    const [date, setDate] = React.useState<Date | undefined>(undefined);

    // ✅ Controlled, local‑safe 'YYYY-MM-DD' string to submit
    const dateYMD = React.useMemo(() => toLocalYMD(date), [date]);

    const [bannerPreview, setBannerPreview] = useState('');
    const [shareEngagement, setSetEngagement] = useState(false);

    const [form, setForm] = useState<FormProps>({
        title: '',
        description: '',
        event_type: eventCategory[0],
        banner_url: null,
        status: 'draft',
        engagement_visible: true,
        extra_info: '',
        venue_name: '',
        venue_address: '',
        city: '',
        country: '',
        start_time: date,
    });

    unstable_usePrompt({
        message: "Your progress will be lost if you leave this page",
        when: ({ currentLocation, nextLocation }) =>
            form.title !== "" && currentLocation.pathname !== nextLocation.pathname,
    });

    useEffect(() => {
        if (actionData?.message) {
            toast.error(actionData.message, {
                description: actionData?.status,
            });
        }
    }, [actionData]);

    return (
        <div className="container">
            <div className="mb-10 max-w-4xl">
                <Stepper
                    steps={["Details", "Tickets"]}
                    currentStep={1}
                />
            </div>

            <Form
                className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-start mb-20"
                method="post"
                encType="multipart/form-data"
            >
                <section className="lg:col-span-7 bg-white flex flex-col gap-10">
                    <header>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Event</h1>
                    </header>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <Label className="text-sm">
                                What type of event are you hosting?
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                {eventCategory.map((item) => (
                                    <Button
                                        key={item}
                                        type="button"
                                        size={"sm"}
                                        variant={"outline"}
                                        className={`rounded-full px-2.5 transition-all duration-200 ${form.event_type === item
                                            ? 'bg-theme-bg text-theme border-theme shadow-md'
                                            : 'text-gray-600 hover:border-theme/50'
                                            }`}
                                        onClick={() => setForm((i) => ({ ...i, event_type: item }))}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                            <input type="hidden" name="event_type" value={form.event_type} required />
                            <InputError for="event_type" error={actionData?.errors} />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Event title</Label>
                            <Input
                                onChange={(e) => setForm((i) => ({ ...i, title: e.target.value }))}
                                name="title"
                                className="bg-gray-50/50 border-gray-200"
                                placeholder="e.g. Phantom of the Opera"
                                required
                            />
                            <InputError for="title" error={actionData?.errors} />
                        </div>

                        {/* Description - FIXED: resize-y prevents layout breaking */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Description</Label>
                            <Textarea
                                onChange={(e) => setForm((i) => ({ ...i, description: e.target.value }))}
                                rows={6}
                                maxLength={255}
                                name="description"
                                className="bg-gray-50/50 border-gray-200 resize-y w-full placeholder:text-gray-300"
                                placeholder="Tell your attendees what to expect..."
                            />
                            <div className="flex justify-end">
                                <span className="text-xs text-gray-400">{form.description?.length || 0}/255</span>
                            </div>
                            <InputError for="description" error={actionData?.errors} />
                        </div>

                        {/* Location Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm">City</Label>
                                <Select required name='city' onValueChange={(value) => setForm((prev) => ({ ...prev, city: value }))}>
                                    <SelectTrigger className="w-full bg-gray-50/50 border-gray-200">
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Supported Cities</SelectLabel>
                                            {nigerianStates.map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state.charAt(0).toUpperCase() + state.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError for="city" error={actionData?.errors} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-sm">Country</Label>
                                <Select required name='country' onValueChange={(value) => setForm((prev) => ({ ...prev, country: value }))}>
                                    <SelectTrigger className="w-full bg-gray-50/50 border-gray-200">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="nigeria">Nigeria</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError for="country" error={actionData?.errors} />
                            </div>
                        </div>

                        {/* Date & Time Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="date-picker" className="text-sm">Date</Label>
                                <Popover open={openDate} onOpenChange={setOpenDate}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date-picker"
                                            className={`justify-between h-10 bg-gray-50/50 border-gray-200 ${!date && "text-gray-400 font-normal"}`}
                                        >
                                            {date ? date.toLocaleDateString() : "Pick a date"}
                                            <RiArrowDownLine className="text-gray-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0 rounded-2xl" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(date) => setDate(date)}
                                            className="rounded-2xl"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <input type="hidden" name="date" value={dateYMD} />
                                <InputError for="date" error={actionData?.errors} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label htmlFor="time-picker" className="text-sm">Start time</Label>
                                <Input
                                    type="time"
                                    id="time-picker"
                                    step="1"
                                    name="start_time"
                                    defaultValue="10:30:00"
                                    className="bg-gray-50/50 border-gray-200 h-10 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                                />
                                <InputError for="start_time" error={actionData?.errors} />
                            </div>
                        </div>

                        {/* Banner Upload */}
                        <div className="flex flex-col gap-1 pt-4">
                            <Label className="text-sm">Event Banner</Label>
                            <div className={`relative flex justify-center items-center rounded-2xl border-2 border-dashed overflow-hidden transition-colors ${form.banner_url ? 'border-primary/50 bg-primary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'} px-6 py-12`}>

                                <Input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    name="banner_url"
                                    required={!form.banner_url}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        const file = e.target.files![0];
                                        if (file) {
                                            setForm((i) => ({ ...i, banner_url: file }));
                                            setBannerPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />

                                <div className="text-center relative z-0">
                                    {form.banner_url ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <img src={bannerPreview} alt="Preview" className="max-h-48 object-cover rounded-lg shadow-sm" />
                                            <span className="text-sm font-medium text-primary">Click to change image</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-4 rounded-full bg-white shadow-sm border border-gray-100">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm ">Click to upload <span className="font-normal text-gray-500">or drag and drop</span></p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <InputError for="banner_url" error={actionData?.errors} />
                        </div>

                    </div>
                </section>

                <aside className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
                    <div className="bg-white flex flex-col gap-6">
                        <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-4">Venue Details</h2>

                        <div className="flex flex-col gap-1">
                            <Label className=" text-sm flex items-center gap-2">
                                <RiUserLocationLine className="text-primary" size={18} /> Hall name
                            </Label>
                            <Input
                                required
                                name="venue_name"
                                className="bg-gray-50/50 border-gray-200 placeholder:text-gray-300"
                                placeholder="e.g. Merit Hall"
                            />
                            <InputError for="venue_name" error={actionData?.errors} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className=" text-sm flex items-center gap-2">
                                <RiMapLine className="text-primary" size={18} /> Address
                            </Label>
                            <Input
                                required
                                name="venue_address"
                                className="bg-gray-50/50 border-gray-200 placeholder:text-gray-300"
                                placeholder="5th Crescent Ave..."
                            />
                            <InputError for="venue_address" error={actionData?.errors} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className=" text-sm flex items-center gap-2">
                                <RiFile4Line className="text-primary" size={18} /> Extra notes
                            </Label>
                            <Textarea
                                name="extra_info"
                                className="p-4 bg-gray-50/50 border-gray-200 resize-y w-full placeholder:text-gray-300"
                                placeholder="Specific instructions for entry..."
                                rows={4}
                            />
                            <InputError for="extra_info" error={actionData?.errors} />
                        </div>
                    </div>

                    <div className="bg-gray-100 px-3 py-4 rounded-3xl border border-gray-100">
                        <div className="flex items-start space-x-3">
                            <Switch
                                id="allow-engagement-visibility"
                                checked={shareEngagement}
                                onCheckedChange={(checked) => setSetEngagement(checked)}
                                className="mt-0.5"
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="allow-engagement-visibility" className="text-sm text-gray-900 cursor-pointer">
                                    Share engagement
                                </Label>
                                <p className="text-xs text-gray-500 mt-1">
                                    Allow attendees to see who else is going and post metrics.
                                </p>
                            </div>
                        </div>
                        <input type="hidden" name="engagement_visible" value={shareEngagement ? 1 : 0} />
                        <InputError for="engagement_visible" error={actionData?.errors} />
                    </div>

                    <Button className="w-full" size={"lg"}>
                        Save & Continue
                    </Button>

                </aside>
            </Form>
        </div>
    )
}
