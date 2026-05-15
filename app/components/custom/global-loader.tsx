import { RiLoader4Line } from "@remixicon/react";

export default function GlobalLoader({ busy }: { busy: boolean }) {
    return (
        <div
            className={`fixed left-1/2 top-6 border z-50 flex -translate-x-1/2 items-center gap-2 bg-white/70 p-2 text-sm font-semibold shadow-md shadow-slate-900/20 transition-all duration-500 ease-out ${
                busy
                    ? "translate-y-0 opacity-100" 
                    : "-translate-y-16 opacity-0 pointer-events-none"
            }`}
        >
            <RiLoader4Line className="h-4 w-4 animate-spin text-primary" />
            <span className="tracking-tight text-primary">Loading...</span>
        </div>
    );
}