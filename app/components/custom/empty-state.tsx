import { RiSearchAiLine, RiSearchLine } from "@remixicon/react";
import { Text } from "../ui/text";

export function SmallEmptyState({
    title = "Nothing here yet!", description = "Try adding something"
}: { title?: string, description?: string }) {
    return (
        <div className="flex items-center gap-3 py-4 text-gray-600">
            <RiSearchAiLine className="size-8" />
            <div className="text-start">
                <Text.small className="font-medium">
                    {title}
                </Text.small>
                <Text.small className="text-gray-400">
                    {description}
                </Text.small>
            </div>
        </div>
    )
}

export function LargeEmptyState({ resource = "Content" }: { resource?: string }) {
    return (
        <div className="animated fadeIn col-span-5 flex flex-col gap-4 items-center justify-center text-center py-10 px-4">
            <div >
                <RiSearchLine className="mb-4 size-20 text-gray-400 animate-bounce" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tighter">No {resource} available</h2>
            <p className="text-gray-500 mb-4 text-sm">
                It seems like there's nothing here yet.
            </p>
        </div>
    );
}


