import type { MetaDescriptor } from "react-router";

interface MetaOptions {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const defaultMeta = ({
    title = "AriaPass - Promoting Live Musical Concerts",
    description = "Discover events, buy tickets, and connect with fellow music enthusiasts on AriaPass",
    image = "https://ariapass.africa/images/banners/app_banner.png",
    url = "https://ariapass.africa"
}: MetaOptions = {}): MetaDescriptor[] => {
    return [
        // Standard Meta Tags
        { title },
        { name: "description", content: description },
        { name: "theme-color", content: "#000000" },
        { name: "keywords", content: "concert, music, fan, ticketing, event booking, AriaPass, OwenaHub" },
        { name: "author", content: "OwenaHub Collective" },
        { name: "robots", content: "index, follow" },

        // Open Graph (Facebook, WhatsApp, LinkedIn)
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@owenahub" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
    ];
};