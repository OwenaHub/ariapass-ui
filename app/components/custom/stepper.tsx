import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from "@remixicon/react";

interface StepperProps {
    /** Array of step names. Pass an empty string "" if you want a step without a name. */
    steps: string[];
    /** The currently active step (1-indexed). Example: 1 for the first step. */
    currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="flex items-center w-full">
            {steps.map((stepName, index) => {
                // Determine if this step is active or completed
                const isActive = index + 1 <= currentStep;
                const isLastStep = index === steps.length - 1;

                return (
                    <div key={index} className={`flex items-center ${isLastStep ? "" : "flex-1"}`}>

                        {/* Step Marker & Label */}
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            {isActive ? (
                                // Active/Completed Icon (Using your theme's primary color, or explicitly text-orange-500 if you want to match the image exactly)
                                <RiCheckboxCircleFill className="h-5 w-5 text-theme md:h-6 md:w-6" />
                            ) : (
                                // Upcoming Icon
                                <RiCheckboxBlankCircleLine className="h-5 w-5 text-gray-500 md:h-6 md:w-6" />
                            )}

                            {/* Step Name (Renders blank if stepName is empty) */}
                            {stepName && (
                                <span
                                    className={`text-sm md:text-base ${isActive
                                        ? "font-bold text-theme" // Match primary color for active
                                        : "font-bold text-gray-500" // Grey for inactive
                                        }`}
                                >
                                    {stepName}
                                </span>
                            )}
                        </div>

                        {/* Connecting Line (Hidden on the very last step) */}
                        {!isLastStep && (
                            <div className="mx-4 h-px flex-1 bg-gray-200"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}