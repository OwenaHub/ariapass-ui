import CustomAvatar from "./custom-avatar";

type GroupSize = "default" | "lg" | "xl";

interface AvatarGroupProps {
    names: string[];
    max?: number;
    size?: GroupSize;
}

// 1. Map the sizes for the avatar, the extra count indicator, and the container overlap
const sizeConfig: Record<GroupSize, { avatar: string; extra: string; overlap: string }> = {
    default: {
        avatar: "md:size-9 size-10 text-sm",
        extra: "size-8 md:size-7 text-xs",
        overlap: "-space-x-3.5"
    },
    lg: {
        avatar: "size-12 text-base",
        extra: "size-10 text-sm",
        overlap: "-space-x-4"
    },
    xl: {
        avatar: "size-16 text-lg",
        extra: "size-14 text-base",
        overlap: "-space-x-5"
    }
};

export default function AvatarGroup({ names, max = names.length, size = "default" }: AvatarGroupProps) {
    const visibleNames = names.slice(0, max);
    const extraCount = names.length - max;

    // 2. Select the configuration based on the passed prop
    const config = sizeConfig[size];

    return (
        <div className={`flex items-center ${config.overlap}`}>
            {visibleNames.map((name, index) => (
                <CustomAvatar key={index} name={name} styles={config.avatar} />
            ))}

            {extraCount > 0 && (
                <div className={`ms-1 flex shrink-0 items-center justify-center rounded-full bg-gray-200 text-primary font-medium ${config.extra}`}>
                    +{extraCount}
                </div>
            )}
        </div>
    );
}