import * as React from "react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Form, useNavigation } from "react-router"
import { RiAddFill, RiCheckLine } from "@remixicon/react"
import { getUpgradeTarget } from "~/lib/static.data"
import FeatureLockedPrompt from "~/components/FeatureLockedPrompt"

export default function AddTicket({ event }: { event: OrganiserEvent }) {
    const [open, setOpen] = React.useState(false)
    // const isDesktop = useMediaQuery("(min-width: 768px)");

    const navigation = useNavigation();
    const formRef = React.useRef<HTMLFormElement>(null);

    const ticketUpgrade = getUpgradeTarget(event, 'ticketTierCount');

    React.useEffect(() => {
        if (navigation.state === "idle") {
            setOpen(false);

            formRef.current?.reset();
        }
    }, [navigation.state, navigation.formData]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center cursor-pointer">
                    <RiAddFill className="size-4" />
                    <span>Add Ticket</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle className="text-xl font-">New Ticket</DialogTitle>
                    <DialogDescription>
                        {/*  */}
                    </DialogDescription>
                </DialogHeader>
                {ticketUpgrade
                    ? (<FeatureLockedPrompt eventSlug={event.slug} featureName="more ticket tiers" />)
                    : (<ProfileForm ref={formRef} />)
                }
            </DialogContent>
        </Dialog>
    )
}

const ProfileForm = React.forwardRef<HTMLFormElement, React.ComponentProps<"form">>(
    function ProfileForm({ className }, ref) {
        const THEMES = ["#6B7280", "#10B981", "#F59E0B", "#4F46E5",]
        const [theme, setTheme] = React.useState(THEMES[1]);

        return (
            <Form ref={ref} className={cn("grid items-start gap-6", className)} method="POST">
                <input type="hidden" name="type" value={'ticket.create'} required />

                <div className="grid gap-2">
                    <Label htmlFor="theme">Select theme</Label>
                    <div className="flex items-stretch gap-3">
                        {THEMES.map(color => (
                            <div className="relative h-14 flex-1" key={color}>
                                <button
                                    title={`Select ${color}`}
                                    onClick={() => setTheme(color)}
                                    type="button"
                                    style={{ backgroundColor: color }}
                                    className={`inline-block h-14 w-full rounded transition ${theme === color ? `outline outline-offset-2 outline-primary` : 'opacity-20'}`}
                                />
                                {theme === color && (
                                    <RiCheckLine
                                        size={30}
                                        className="animated fadeIn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <input type="hidden" name="theme" value={theme} required />

                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue="Regular"
                        required
                    />
                </div>
                <input
                    type="hidden"
                    className="placeholder:text-gray-300 rounded-xl"
                    id="description"
                    defaultValue="Access to the event; admits one person."
                    name="description"
                />

                <div className="flex items-stretch gap-5">
                    <div className="grid gap-2 flex-1">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="5,000"
                            required
                        />
                    </div>
                    <div className="grid gap-2 flex-1">
                        <Label htmlFor="quantity_available">Available units</Label>
                        <Input
                            type="number"
                            id="quantity_available"
                            name="quantity_available"
                            placeholder="50"
                            required
                        />
                    </div>
                </div>

                <Button size={"lg"} disabled={!theme}>
                    Save ticket
                </Button>
            </Form>
        )
    }
);

ProfileForm.displayName = "ProfileForm";