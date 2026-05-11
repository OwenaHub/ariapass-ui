import {
    RiCheckboxCircleFill,
    RiCloseCircleFill,
    RiInformationFill,
    RiAlertFill,
    RiNotification4Fill
} from '@remixicon/react';

// 1. Core Types
export const MESSAGE_TYPES = ['success', 'error', 'info', 'warning', 'default'] as const;
export type MessageType = typeof MESSAGE_TYPES[number];

// 2. The Grouped Message Keys
export const msg = {
    general: {
        appWelcome: 'welcome_home',
        actionSuccess: 'action_success',
        actionFailed: 'action_failed',
    },
    auth: {
        noProfile: 'no_active_profile',
        resetStatus: 'reset_status',
        profileSubmitted: 'profile_submitted',
    },
    events: {
        created: 'event_created',
        deleted: 'event_deleted',
        updated: 'event_updated',
    },
    tickets: {
        purchased: 'ticket_purchased',
    }
} as const;

export type MsgCode = {
    [Domain in keyof typeof msg]: (typeof msg)[Domain][keyof (typeof msg)[Domain]]
}[keyof typeof msg];

// 4. The Message Content Dictionary
export const MESSAGE_DICTIONARY: Record<MsgCode, { title: string; description: string }> = {
    // General
    [msg.general.appWelcome]: {
        title: "Welcome to AriaPass",
        description: "Music, passion and good vibes go with you!",
    },
    [msg.general.actionSuccess]: {
        title: "Action Success",
        description: "All good, request processed, nothing to see here",
    },
    [msg.general.actionFailed]: {
        title: "Action Failed",
        description: "We hit a little snag trying to process that. Please try again.",
    },

    // Auth
    [msg.auth.noProfile]: {
        title: "You are not an organiser!",
        description: "To access this page, you need to have an active organiser profile.",
    },
    [msg.auth.resetStatus]: {
        title: "Status Reset",
        description: "Your status has been reset successfully.",
    },
    [msg.auth.profileSubmitted]: {
        title: "Profile submitted",
        description: "Kindly proceed to filling in your bank details and we will verify your account",
    },

    // Events
    [msg.events.created]: {
        title: "Event created! 🎉",
        description: "Create tickets and add an event program in the next steps.",
    },
    [msg.events.deleted]: {
        title: "Event Deleted",
        description: "The event has been permanently removed from your dashboard.",
    },

    [msg.events.updated]: {
        title: "Event Updated",
        description: "The event has been updated.",
    },

    // Tickets
    [msg.tickets.purchased]: {
        title: "You're on the list! 🎟️",
        description: "Your ticket is secured. We've sent the details to your email.",
    },
};

// 5. The Theme Settings
export const THEME_MAP: Record<MessageType, { iconColor: string; iconBg: string; border: string; icon: any }> = {
    success: { iconColor: "text-green-600", iconBg: "bg-green-50", border: "border-green-500", icon: RiCheckboxCircleFill },
    error: { iconColor: "text-red-600", iconBg: "bg-red-50", border: "border-red-500", icon: RiCloseCircleFill },
    info: { iconColor: "text-blue-600", iconBg: "bg-blue-50", border: "border-blue-500", icon: RiInformationFill },
    warning: { iconColor: "text-amber-600", iconBg: "bg-amber-50", border: "border-amber-500", icon: RiAlertFill },
    default: { iconColor: "text-slate-600", iconBg: "bg-slate-50", border: "border-slate-500", icon: RiNotification4Fill },
};

// 6. Fallbacks for unknown codes
export const FALLBACK_CONTENT: Record<MessageType, { title: string; description: string }> = {
    success: { title: "Success!", description: "The action was completed successfully." },
    error: { title: "Oops, an error occurred", description: "Something went wrong on our end." },
    info: { title: "Information", description: "Just thought you should know." },
    warning: { title: "Warning", description: "Please proceed with caution." },
    default: { title: "Notice", description: "Here is some information for you." }
};