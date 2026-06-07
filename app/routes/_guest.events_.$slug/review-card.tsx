import { RiDeleteBinLine, RiPencilLine, RiQuestionFill, RiStarSFill } from "@remixicon/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useFetcher } from "react-router";
import { FormatLineBreak } from "~/components/custom/format-line-break";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

dayjs.extend(relativeTime);

export default function ReviewCard({ review, user }: {
    review: EventReviews, user: User,
}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const fetcher = useFetcher();

    React.useEffect(() => {
        if (fetcher.state === 'loading') {
            setIsEditing(false);
        }
    }, [fetcher.state]);

    return (
        <div key={review.id} className="mb-5">
            {isEditing ? (
                <div>
                    <fetcher.Form
                        preventScrollReset
                        method="patch"
                        action={`reviews/${review.id}/edit`}
                    >
                        <Label className="mb-1 font-bold">Edit your comment</Label>
                        <Textarea name="comment" className="text-sm" defaultValue={review.comment} />

                        <div className="flex items-center gap-2 mt-2">
                            <Button
                                className="text-xs px-3"
                                size={'sm'}
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                className="text-xs px-3" size={'sm'}
                                variant={'secondary'}
                                type="button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </fetcher.Form>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <div className="font-semibold text-sm tracking-tight">
                            {review.isAnonymous
                                ? <div className="flex items-center gap-0.5" title="This review is anonymous">
                                    <span className="text-gray-500">
                                        Anonymous
                                    </span>
                                    <RiQuestionFill
                                        className="size-4 fill-blue-500"
                                    />
                                </div>
                                : review.user.name
                            }
                        </div>
                        <div className="text-xs text-gray-400 font-light tracking-tight">
                            {dayjs(review.createdAt).fromNow()}
                        </div>
                        <div className="text-xs flex items-center">
                            ({review.rating} <RiStarSFill className={"text-orange-500"} size={14} />)
                        </div>
                    </div>

                    <div className="text-gray-700 text-sm tracking-tight">
                        <FormatLineBreak input={review.comment} />
                    </div>
                </>
            )}

            <div className="flex items-center gap-4 mt-2">
                {(user?.id === review?.user?.id && !isEditing) &&
                    <>
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="text-xs font-light text-gray-500 flex items-center gap-1 mt-2 hover:text-primary transition cursor-pointer"
                        >
                            <span>Edit</span> <RiPencilLine className="size-3" />
                        </button>

                        <fetcher.Form
                            preventScrollReset
                            method="DELETE"
                            action={`reviews/${review.id}/delete`}
                        >
                            <button
                                onClick={(e) => {
                                    if (!window.confirm(`Are you sure you want to delete this review?`)) {
                                        e.preventDefault();
                                    }
                                }}
                                type="submit"
                                className="text-xs font-light text-destructive flex items-center gap-1 mt-2 transition cursor-pointer"
                            >
                                <span>Delete</span> <RiDeleteBinLine className="size-3" />
                            </button>
                        </fetcher.Form>
                    </>
                }
            </div>
        </div>
    )
}
