import * as React from "react"
import { cn } from "~/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "~/components/ui/drawer"
import { Label } from "~/components/ui/label"
import { useMediaQuery } from "~/hooks/user-media-query"
import { Textarea } from "~/components/ui/textarea"
import { Link, useFetcher, useNavigation } from "react-router";
import { Switch } from "~/components/ui/switch"
import { Button } from "~/components/ui/button"
import { RiAlertLine, RiArrowRightSLine, RiStarFill } from "@remixicon/react"

interface PostReviewProps {
    event: OrganiserEvent;
    user: User;
    children: React.ReactNode;
}

export default function PostReviewWrapper({ event, user, children }: PostReviewProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const navigation = useNavigation();
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (navigation.state === "idle") {
            setOpen(false);
            formRef.current?.reset();
        }
    }, [navigation.state]);

    const renderContent = () => (
        <>
            {!user?.email ? (
                <div className="text-center md:text-start pb-5 px-4 md:px-0">
                    <p className="text-sm font-light text-gray-500 my-5">
                        <RiAlertLine className="inline-block size-4 text-destructive" />  You need to log in before posting a review.
                    </p>
                    <Link
                        to={`/login?redirect=/events/${event.slug}/review`}
                    >
                        <Button variant={'secondary'}>
                            <span>Continue</span>
                            <RiArrowRightSLine className="inline-block ms-1" size={14} />
                        </Button>
                    </Link>
                </div>
            ) : <ProfileForm event={event} ref={formRef} className="px-4 md:px-0" />}
        </>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Review</DialogTitle>
                        <DialogDescription>Share your thoughts about this event.</DialogDescription>
                    </DialogHeader>
                    {renderContent()}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Review</DrawerTitle>
                    <DrawerDescription>Share your thoughts about this event.</DrawerDescription>
                </DrawerHeader>
                {renderContent()}
                <DrawerFooter className="pt-2" />
            </DrawerContent>
        </Drawer>
    )
}
type ProfileFormProps = {
    event: OrganiserEvent;
} & React.ComponentProps<"form">;

const ProfileForm = React.forwardRef<HTMLFormElement, ProfileFormProps>(

    function ProfileForm({ className, event }, ref) {
        const fetcher = useFetcher();

        const [rating, setRating] = React.useState(5);
        const [hoverRating, setHoverRating] = React.useState<number | null>(null);
        const [isAnonymous, setIsAnonymous] = React.useState(false);
        const [isPublic, setIsPublic] = React.useState(true);

        return (
            <fetcher.Form
                ref={ref}
                method="POST"
                action={`/events/${event.slug}/reviews`}
                className={cn("grid items-start gap-3", className)}
            >
                <div className="flex flex-col gap-1.5 mb-2">
                    <Label className="text-xs text-primary font-medium">Your Rating</Label>
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const starValue = i + 1;
                            const isActive = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="outline-hidden transition-transform active:scale-90"
                                >
                                    <RiStarFill
                                        className={cn(
                                            "w-7 h-7 transition-colors",
                                            isActive ? "text-amber-500" : "text-slate-200"
                                        )}
                                    />
                                </button>
                            );
                        })}
                        <span className="text-sm font-black text-slate-700 ml-1.5 w-4">
                            {hoverRating !== null ? hoverRating : rating}
                        </span>
                    </div>
                    {/* Hidden payload input for the fetcher */}
                    <input type="hidden" name="rating" value={rating} />
                </div>

                <div className="grid gap-2">
                    <Textarea
                        className="placeholder:text-gray-300 min-h-35"
                        id="comment"
                        name="comment"
                        rows={6}
                        required
                        placeholder="Write your review here..."
                    />
                </div>

                <div className="mb-5 rounded-lg w-full flex gap-2 items-center">
                    <div className="bg-gray-100 flex-1 p-4 rounded flex items-center space-x-2">
                        <Switch
                            id="post-anonymously"
                            checked={isAnonymous}
                            onCheckedChange={(checked) => setIsAnonymous(checked)}
                        />
                        <Label htmlFor="post-anonymously" className="text-[10px] text-nowrap">
                            Post anonymously
                        </Label>
                        <input type="hidden" name="is_anonymous" value={isAnonymous ? 1 : 0} />
                    </div>

                    <div className="bg-gray-100 flex-1 p-4 rounded flex items-center space-x-2">
                        <Switch
                            id="to-organiser"
                            checked={isPublic}
                            onCheckedChange={(checked) => setIsPublic(checked)}
                        />
                        <Label htmlFor="to-organiser" className="text-[10px]">
                            Public review
                        </Label>
                        <input type="hidden" name="is_public" value={isPublic ? 1 : 0} />
                    </div>
                </div>

                <Button size={"lg"} type="submit">
                    Post review
                </Button>
            </fetcher.Form>
        );
    }
);

ProfileForm.displayName = "ProfileForm";