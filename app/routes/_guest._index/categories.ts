const date = new Date();
const year = date.getFullYear();

export const dateCategories = [
    {
        title: "Christmas Concerts",
        startDate: `${year}-11-20`,
        endDate: `${year}-12-29`,
        bannerUrl: "/images/banners/john-onaeko.jpg"
    },
    {
        title: "Mid-year Concerts",
        startDate: `${year}-06-01`,
        endDate: `${year}-08-31`,
        bannerUrl: "/images/banners/john-onaeko.jpg",
    },
    {
        title: "Easter Concerts",
        startDate: `${year}-04-05`,
        endDate: `${year}-05-30`,
        bannerUrl: "/images/banners/john-onaeko.jpg"
    },
] as const;

export const genreCategories = [
    {
        title: "Classical Concerts",
        description: "Popular performances of Mozart, Beethoven, Bach and more.",
        bannerUrl: "/images/banners/john-onaeko.jpg",
        tag: "classical"
    },
    {
        title: "Jazz Festivals",
        description: "Soulful rhythms of jazz with top artists.",
        bannerUrl: "/images/banners/john-onaeko.jpg",
        tag: "jazz"
    },
    {
        title: "Rock Music",
        description: "Rock 'n Roll music with top artists.",
        bannerUrl: "/images/banners/john-onaeko.jpg",
        tag: "rock"
    },
    {
        title: "Nigerian Opera",
        description: "Traditional Nigerian opera performances with chorals.",
        bannerUrl: "/images/banners/john-onaeko.jpg",
        tag: "opera"
    },
] as const;