const date = new Date();
const year = date.getFullYear();

import dayjs from 'dayjs';

export const upcomingEventCategory = [
  {
    title: "Upcoming Events",
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().add(2, 'month').format('YYYY-MM-DD'),
    bannerUrl: "/images/banners/concert-banner.jpg" // Make sure to update this with your actual image path
  }
] as const;

export const dateCategories = [
  {
    title: "New Year Concerts",
    startDate: `${year}-01-01`,
    endDate: `${year}-01-31`,
    bannerUrl: "/images/banners/new-year-banner.jpg"
  },
  {
    title: "Valentine’s Love Shows",
    startDate: `${year}-02-01`,
    endDate: `${year}-02-28`,
    bannerUrl: "/images/banners/valentines-banner.jpg"
  },
  {
    title: "Easter Concerts & Festivals",
    startDate: `${year}-03-20`,
    endDate: `${year}-04-30`,
    bannerUrl: "/images/banners/church-banner.jpg"
  },
  {
    title: "Mid-year Concerts",
    startDate: `${year}-05-01`,
    endDate: `${year}-09-30`,
    bannerUrl: "/images/banners/concert-banner-2.jpg"
  },
  {
    title: "Independence Day Concerts",
    startDate: `${year}-10-01`,
    endDate: `${year}-10-02`,
    bannerUrl: "/images/banners/nigeria-banner.jpg"
  },
  {
    title: "Christmas Carols & Live Music",
    startDate: `${year}-11-20`,
    endDate: `${year}-12-28`,
    bannerUrl: "/images/banners/christmas-banner.jpg"
  }

] as const;

export const genreCategories = [
  {
    title: "Event Timeline",
    description: "See all events from the past, present and upcoming.",
    theme: "bg-linear-to-r from-gray-900 to-theme",
    href: "/events/?filter=all"
  },
  {
    title: "Classical Concerts",
    description: "Popular performances of Mozart, Beethoven, Bach and more.",
    theme: "bg-[#F08D39]",
    href: "/events/?category=classical"
  },
  {
    title: "Jazz Festivals",
    description: "Soulful rhythms of jazz with top artists.",
    theme: "bg-[#3852B4]",
    href: "/events/?category=jazz"
  },
  {
    title: "Rock Music",
    description: "Rock 'n Roll music with top artists.",
    theme: "bg-fuchsia-300",
    href: "/events/?category=rock"
  },
  {
    title: "Nigerian Opera",
    description: "Traditional Nigerian opera performances with chorals.",
    theme: "bg-green-500",
    href: "/events/?category=opera"
  },
] as const;

export const upcomingFeaturedEvent = [
  {
    title: "AriaPass Unplugged: Live in the Capital",
    description: "Experience the ultimate fusion of Afrobeat and live Jazz featuring top rising stars. An unforgettable night of soulful melodies and incredible community vibes.",
    date: `${year}-08-15`,
    time: "19:00",
    venue: "Transcorp Hilton",
    city: "Abuja",
    price: 15000,
    bannerUrl: "/images/banners/concert-banner-2.jpg",
    slug: "ariapass-unplugged-live" // to link to the event page
  }
] as const;