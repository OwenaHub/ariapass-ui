import { Text } from "../ui/text";

export default function EmptyState({
    title = "Nothing here yet!", description = "Try adding something"
}: { title?: string, description?: string }) {
    return (
        <div className="text-start p-3 rounded-2xl bg-white">
            <Text.small className="font-medium text-gray-500">
                {title}
            </Text.small>
            <Text.small className="text-gray-400">
                {description}
            </Text.small>
        </div>
    )
}
