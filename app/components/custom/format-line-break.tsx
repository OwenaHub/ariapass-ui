export function FormatLineBreak({ input }: { input: string | null }) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return (input ?? '').split('\n').map((line: string, index: number) => (
        <p key={index} className="text-wrap min-h-0.5">
            {line === "" ? (
                <br />
            ) : (
                line.split(urlRegex).map((part, i) => {
                    if (part.match(urlRegex)) {
                        return (
                            <a
                                key={i}
                                href={part}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline underline-offset-2 hover:text-blue-700 transition-colors"
                            >
                                {part}
                            </a>
                        );
                    }
                    return part;
                })
            )}
        </p>
    ));
}