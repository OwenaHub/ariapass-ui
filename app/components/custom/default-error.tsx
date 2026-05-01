import { isRouteErrorResponse } from "react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import { RiArrowDownLine, RiArrowLeftLine, RiRefreshLine } from "@remixicon/react";

export default function DefaultError({ error }: { error: unknown }) {
    const [showStack, setShowStack] = useState(false);

    let message = "Aww, snap!";
    let details = "We hit a little snag on our end. Don't worry, your tickets are safe.";
    let status: string | number = "Error";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        status = error.status;
        message = error.status === 404 ? "The beat stopped!" : "Something went wrong";
        details = error.status === 404
            ? "The page you’re looking for has moved or doesn't exist anymore."
            : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        // Added a subtle radial gradient to the background for more depth
        <main className="min-h-[80vh] w-full flex items-center justify-center pt-10 p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50/50 to-slate-50/50">
            <div className="max-w-2xl w-full text-center">

                {/* Text Content */}
                <div className="space-y-5 mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs uppercase">
                        {/* Live indicator dot */}
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        {status}
                    </span>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {message}
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
                        {details}
                    </p>
                </div>

                {/* Action Buttons - Moved to primary focus area */}
                <div className="flex sm:flex-row items-center justify-center gap-4 mb-14">
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        className="sm:w-auto flex items-center gap-2 hover:shadow-sm transition-all"
                    >
                        <RiArrowLeftLine className="h-5 w-5" />
                        Go Back
                    </Button>

                    <Button
                        onClick={() => window.location.reload()}
                        className="sm:w-auto flex items-center gap-2 shadow-lg"
                    >
                        <RiRefreshLine className="h-5 w-5" />
                        Try Again
                    </Button>
                </div>

                {/* Developer Details */}
                {stack && (
                    <div className="mt-16 pt-8 border-t border-slate-200/60">
                        <button
                            onClick={() => setShowStack(!showStack)}
                            className="flex items-center gap-2 mx-auto text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors group"
                        >
                            <RiArrowDownLine className={`h-4 w-4 transition-transform duration-300 ${showStack ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                            Technical Details (Developer Only)
                        </button>

                        {showStack && (
                            <div className="mt-6 text-left animate-in fade-in slide-in-from-top-4 duration-300">
                                <pre className="p-6 bg-slate-900 rounded-2xl overflow-x-auto text-[11px] leading-relaxed text-indigo-300 font-mono shadow-inner border border-slate-800">
                                    <code>{stack}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}