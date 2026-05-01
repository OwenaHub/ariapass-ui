export const MESSAGE_TYPES = ['success', 'error', 'info', 'warning', 'default'] as const;
export type MessageType = typeof MESSAGE_TYPES[number];
import {
    RiCheckboxCircleFill,
    RiCloseCircleFill,
    RiInformationFill,
    RiAlertFill,
    RiNotification4Fill
} from '@remixicon/react';

export const MESSAGE_DICTIONARY: Record<string, { title: string; description: string }> = {
    event_created: {
        title: "Event Published! 🎉",
        description: "Your event is now live and ready to accept registrations.",
    },
    ticket_purchased: {
        title: "You're on the list! 🎟️",
        description: "Your ticket is secured. We've sent the details to your email.",
    },
    action_failed: {
        title: "Action Failed",
        description: "We hit a little snag trying to process that. Please try again.",
    },
    no_active_profile: {
        title: "You are not an organiser!",
        description: "To access this page, you need to have an active organiser profile. Please create one in your account settings and try again.",
    },
    reset_status: {
        title: "Status Reset",
        description: "Your status has been reset successfully.",
    },
    profile_submitted: {
        title: "Profile submitted",
        description: "Kindly proceed to filling in your bank details and we will verify your account",
    },
};

export const THEME_MAP: Record<MessageType, { iconColor: string; iconBg: string; border: string; icon: any }> = {
    success: { iconColor: "text-green-600", iconBg: "bg-green-100", border: "border-green-500", icon: RiCheckboxCircleFill },
    error: { iconColor: "text-red-600", iconBg: "bg-red-100", border: "border-red-500", icon: RiCloseCircleFill },
    info: { iconColor: "text-blue-600", iconBg: "bg-blue-100", border: "border-blue-500", icon: RiInformationFill },
    warning: { iconColor: "text-amber-600", iconBg: "bg-amber-100", border: "border-amber-500", icon: RiAlertFill },
    default: { iconColor: "text-slate-600", iconBg: "bg-slate-100", border: "border-slate-500", icon: RiNotification4Fill },
};

// 4. Expanded fallback content
export const FALLBACK_CONTENT: Record<MessageType, { title: string; description: string }> = {
    success: { title: "Success!", description: "The action was completed successfully." },
    error: { title: "Oops, an error occurred", description: "Something went wrong on our end." },
    info: { title: "Information", description: "Just thought you should know." },
    warning: { title: "Warning", description: "Please proceed with caution." },
    default: { title: "Notice", description: "Here is some information for you." }
};