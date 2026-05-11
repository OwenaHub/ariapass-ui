import {
    RiRecordCircleFill,
    RiCheckboxBlankCircleLine,
    RiCircleFill
} from "@remixicon/react";

interface StepperProps {
    /** Array of step names. Pass an empty string "" if you want a step without a name. */
    steps: string[];
    /** The currently active step (1-indexed). Example: 1 for the first step. */
    currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
    // Calculate the percentage of the progress line to fill
    const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        // pb-10 reserves vertical space so our absolute-positioned text doesn't overlap content below it
        <div className="relative flex w-full justify-between items-start pb-10">

            {/* Global Background Line */}
            <div className="absolute top-2.5 md:top-3 left-0 right-0 h-0.5 bg-gray-200 z-0" />

            {/* Global Progress Line (Fills up dynamically) */}
            <div
                className="absolute top-2.5 md:top-3 left-0 h-0.5 bg-theme transition-all duration-500 ease-in-out z-0"
                style={{ width: `${progressPercentage}%` }}
            />

            {steps.map((stepName, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                const isFirstStep = index === 0;
                const isLastStep = index === steps.length - 1;

                return (
                    <div key={index} className="relative z-10 flex flex-col items-center">

                        {/* Dot Marker (bg-white perfectly masks the line underneath) */}
                        <div className="relative flex items-center justify-center bg-white rounded-full">
                            {isCompleted ? (
                                <RiCircleFill className="size-5 md:size-6 text-theme" />
                            ) : isActive ? (
                                <div className="relative flex items-center justify-center">
                                    <RiRecordCircleFill className="relative z-10 size-5 md:size-6 text-theme" />
                                    <div className="absolute inset-0 rounded-full bg-theme/30 animate-ping" />
                                </div>
                            ) : (
                                <RiCheckboxBlankCircleLine className="size-5 md:size-6 text-gray-300 bg-white rounded-full" />
                            )}
                        </div>

                        {/* Step Label 
                            - Absolute positioned so it doesn't mess up the flex spacing.
                            - Dynamically anchored to the left, center, or right based on its position! 
                        */}
                        {stepName && (
                            <div
                                className={`absolute top-6 md:top-8 w-20 md:w-32 ${isFirstStep
                                        ? "left-0 text-left"
                                        : isLastStep
                                            ? "right-0 text-right"
                                            : "left-1/2 -translate-x-1/2 text-center"
                                    }`}
                            >
                                <span
                                    className={`block text-[10px] md:text-sm font-semibold tracking-tight transition-colors duration-300 ${isActive
                                            ? "text-theme"
                                            : isCompleted
                                                ? "text-slate-800"
                                                : "text-slate-400"
                                        }`}
                                >
                                    {stepName}
                                </span>
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
}