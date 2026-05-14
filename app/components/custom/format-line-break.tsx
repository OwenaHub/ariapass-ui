import { Text } from "../ui/text";

export function FormatLineBreak({ input }: { input: string | null }) {
    return (input ?? '').split('\n').map((line: string, index: number) => (
        <Text.p key={index} className="text-wrap min-h-4.5">
            {line === "" ? <br /> : line}
        </Text.p>
    ));
}