import { RiSearchAiLine } from "@remixicon/react";
import { Text } from "../ui/text";

export default function EmptyState({
    title = "Nothing here yet!", description = "Try adding something"
}: { title?: string, description?: string }) {
    return (
        <div className="flex items-center gap-3 py-2 text-gray-600">
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
