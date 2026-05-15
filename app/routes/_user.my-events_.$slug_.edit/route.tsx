import React, { useEffect, useState } from 'react'
import type { Route } from '../_user.my-events_.$slug_.edit/+types/route';
import { toast } from 'sonner';
import { Form, redirect, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Calendar } from '~/components/ui/calendar';
import { Switch } from '~/components/ui/switch';
import { STORAGE_URL } from '~/config/defaults';
import { defaultMeta } from '~/lib/meta'
import InputError from '~/components/custom/input-error';
import { eventCategory, nigerianStates } from '~/lib/static.data';
import { RiCalendar2Line, RiFile4Line, RiMapLine, RiMapPinLine } from '@remixicon/react';
import { getOrganiserEvent, updateEvent } from '~/handlers/organiser/events';
import { handleActionError } from '~/lib/logger.server';
import type { FormProps } from '~/types/d.event-form';
import { withMsg } from '~/lib/redirector';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Edit Event | AriaPass" },
    ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const res = await getOrganiserEvent(request, `organiser/events/${params.slug}`);
        return { event: res }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/my-events?error=action_failed')
    }
}

export async function action({ request, params }: Route.ActionArgs) {
    try {
        const createdEvent: OrganiserEvent = await updateEvent(request, `organiser/events/${params.slug}`);
        return redirect(
            withMsg(`/my-events/${createdEvent.slug}`, 'success', 'event_updated')
        );
    } catch (error) {
        return handleActionError(error);
    }
}

// If you use date-fns, you can replace toLocalYMD with format(date, 'yyyy-MM-dd')

/** Parse 'YYYY-MM-DD' as a local Date at midnight (no UTC shift). */
function parseLocalDateFromYMD(ymd?: string): Date | undefined {
    if (!ymd) return undefined;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
    if (!m) return undefined;
    const [_, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d)); // local midnight
}

/** Try to safely parse any server value into a local calendar Date. */
function safeParseEventDate(input?: string): Date | undefined {
    if (!input) return undefined;

    // If server sends plain 'YYYY-MM-DD'
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        return parseLocalDateFromYMD(input);
    }

    // Otherwise, let JS parse (ISO, etc.), then normalize to local midnight
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return undefined;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Format a Date into 'YYYY-MM-DD' using **local** calendar. */
function toLocalYMD(d?: Date): string {
    return d
        ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`
        : "";
}

export default function EditEvent({ loaderData, actionData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent | any } = loaderData;

    const [openDate, setOpenDate] = useState(false)
    const initialDate = React.useMemo(() => safeParseEventDate(event.date), [event.date]);
    const [date, setDate] = React.useState<Date | undefined>(initialDate);

    // ✅ Controlled, local‑safe 'YYYY-MM-DD' string to submit
    const dateYMD = React.useMemo(() => toLocalYMD(date), [date]);

    const [bannerPreview, setBannerPreview] = useState(STORAGE_URL + '/' + event.bannerUrl);

    const [shareEngagement, setSetEngagement] = useState(event.engagementVisible);

    const [form, setForm] = useState<FormProps>({
        title: event?.title || '',
        description: event.description || '',
        event_type: event.eventType || '',
        banner_url: null,
        status: event.status || 'draft',
        engagement_visible: event.engagementVisible,
        extra_info: event.extraInfo || '',
        venue_name: event.venueName || '',
        venue_address: event.venueAddress || '',
        city: event.city || '',
        country: event.country || '',
        start_time: event.startTime || '',
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
            <Form
                className="mx-auto grid grid-cols-1 lg:grid-cols-10 gap-10 items-start mb-20 mt-5"
                method="post"
                encType="multipart/form-data"
            >
                <section className="lg:col-span-6 bg-white flex flex-col gap-5">
                    <header>
                        {/* Changed Title */}
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Event</h1>
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
                                        variant={form.event_type === item ? "default" : 'secondary'}
                                        onClick={() => setForm((i) => ({ ...i, event_type: item }))}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </div>
                            <input type="hidden" name="event_type" value={form.event_type} required />

                            {/* Preserved 'Other' input logic, styled to match the new design */}
                            {form.event_type === "Other" && (
                                <Input
                                    onChange={(e) => setForm((i) => (
                                        { ...i, event_type: e.target.value }
                                    ))}
                                    className="bg-gray-50/50 border-gray-200 mt-2"
                                    placeholder="Type custom event type (max 15 characters)"
                                    maxLength={15}
                                    required
                                />
                            )}
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
                                value={form.title}
                                required
                            />
                            <InputError for="title" error={actionData?.errors} />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Description</Label>
                            <Textarea
                                onChange={(e) => setForm((i) => ({ ...i, description: e.target.value }))}
                                rows={10}
                                maxLength={500}
                                name="description"
                                className="bg-gray-50/50 border-gray-200 resize-y w-full placeholder:text-gray-300"
                                placeholder="Tell your attendees what to expect..."
                                value={form.description}
                            />
                            <div className="flex justify-end">
                                <span className="text-xs text-gray-400">{form.description?.length || 0}/500</span>
                            </div>
                            <InputError for="description" error={actionData?.errors} />
                        </div>

                        {/* Location Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm">City</Label>
                                <Select
                                    required
                                    name='city'
                                    onValueChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
                                    value={form.city}
                                >
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
                                <Select
                                    required
                                    name='country'
                                    onValueChange={(value) => setForm((prev) => ({ ...prev, country: value }))}
                                    value={form.country}
                                >
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
                                            className={`justify-between h-10 shadow-none border text-xs ${!date && "text-gray-400 font-normal"}`}
                                        >
                                            {date ? date.toLocaleDateString() : "Pick a date"}
                                            <RiCalendar2Line className="text-gray-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0 rounded-2xl" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={(date) => {
                                                setDate(date);
                                                // setOpenDate(false);
                                            }}
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
                                    // Preserved the exact string/date formatting logic from your edit page
                                    defaultValue={
                                        form.start_time
                                            ? typeof form.start_time === 'string'
                                                ? form.start_time
                                                : form.start_time.toISOString().substring(11, 16)
                                            : ''
                                    }
                                    className="bg-gray-50/50 border-gray-200 h-10 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                                />
                                <InputError for="start_time" error={actionData?.errors} />
                            </div>
                        </div>

                        {/* Banner Upload - Upgraded to new design */}
                        <div className="flex flex-col gap-1 pt-4">
                            <Label className="text-sm">Event Banner</Label>
                            <div className={`relative flex justify-center items-center rounded-2xl border-2 border-dashed overflow-hidden transition-colors ${form.banner_url ? 'border-primary/50 bg-primary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'} px-6 py-12`}>
                                <Input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    name={form.banner_url ? "banner_url" : ""}
                                    // required={!form.banner_url}
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
                                    {event.bannerUrl ? (
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

                {/* Sticky Sidebar */}
                <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                    <div className="bg-white flex flex-col gap-6">
                        <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-4">Venue Details</h2>

                        <div className="flex flex-col gap-1">
                            <Label className=" text-sm flex items-center gap-2">
                                <RiMapPinLine className="text-primary" size={18} /> Hall name
                            </Label>
                            <Input
                                required
                                name="venue_name"
                                className="bg-gray-50/50 border-gray-200 placeholder:text-gray-300"
                                placeholder="e.g. Merit Hall"
                                defaultValue={form.venue_name} // Preserved default value
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
                                className="placeholder:text-gray-300"
                                placeholder="5th Crescent Ave..."
                                defaultValue={form.venue_address}
                            />
                            <InputError for="venue_address" error={actionData?.errors} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className=" text-sm flex items-center gap-2">
                                <RiFile4Line className="text-primary" size={18} /> Extra notes
                            </Label>
                            <Textarea
                                name="extra_info"
                                className="resize-y w-full placeholder:text-gray-300"
                                placeholder="Specific instructions for entry..."
                                rows={10}
                                maxLength={150}
                                defaultValue={form.extra_info}
                            />
                            <InputError for="extra_info" error={actionData?.errors} />
                        </div>
                    </div>

                    {/* Engagement Visibility */}
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

                    {/* Update Button */}
                    <Button className="w-full" size={"lg"}>
                        Update Event
                    </Button>

                </aside>
            </Form>
        </div>
    )
}