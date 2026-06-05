import { RiLoader4Line } from "@remixicon/react";

export default function GlobalLoader({ busy }: { busy: boolean }) {
    return (
        <div
            className={`fixed inset-0 z-9999 flex items-center justify-center bg-gray-900/10 backdrop-blur-xs transition-all duration-300 ease-out ${busy
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex items-center gap-3 px-6 py-3 transition-transform duration-300 ease-out scale-100">
                <RiLoader4Line className="size-10 animate-spin text-white" />
            </div>
        </div>
    );
}