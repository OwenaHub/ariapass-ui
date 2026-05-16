import VideoBanner from "./video-banner";
import SearchBox from "./search-box";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import type { Route } from "../_guest._index/+types/route";
import { getGuestEvents } from "~/handlers/user/events";
import { handleActionError } from "~/lib/logger.server";
import EventCardSkeleton from "~/components/custom/events-card-skeleton";
import { Suspense } from "react";
import { Await, Link } from "react-router";
import EmptyState from "~/components/custom/empty-state";
import { STORAGE_URL } from "~/config/defaults";
import dayjs from "dayjs";
import { to12HourFormat } from "~/lib/utils";
import { RiMapPinLine } from "@remixicon/react";

export async function loader({ request }: Route.LoaderArgs) {
  const events: Promise<OrganiserEvent[]> = getGuestEvents(request, 'events')
    .catch((error) => {
      handleActionError(error);
      return null;
    });

  return { events };
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  const categories = [
    { name: "Afrobeats", icon: "ri-music-2-line" },
    { name: "Hip Hop", icon: "ri-mic-line" },
    { name: "Electronic", icon: "ri-disc-line" },
    { name: "Jazz & Blues", icon: "ri-trumpet-line" },
    { name: "Rock", icon: "ri-guitar-line" },
    { name: "Classical", icon: "ri-quill-pen-line" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <VideoBanner />

          <div className="relative max-w-5xl mx-auto -mt-12 z-10 px-4 sm:px-6">
            <SearchBox />
          </div>
        </div>
      </div>

      <main className="container">
        <div className="mt-10 mb-16">
          <div className="flex gap-2 items-center mb-5">
            <RiMapPinLine />
            <Text.h3>
              Events in <span className="text-theme">Nigeria</span>
            </Text.h3>
          </div>
          <Suspense fallback={<EventCardSkeleton />}>
            <Await resolve={events}>
              {(events) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pb-5">
                  {events?.length ? events.map((ev) => {
                    // 1. Keep the full date for the text below the image
                    const formattedDate = dayjs(ev.date).format('MMMM D, YYYY');

                    // 2. Ask Day.js explicitly for the Badge formats
                    const badgeDay = dayjs(ev.date).format('DD'); // 'DD' guarantees a 2-digit number (e.g., "05")
                    const badgeMonth = dayjs(ev.date).format('MMM'); // 'MMM' guarantees a 3-letter month (e.g., "Dec")

                    return (
                      <Link to={`/events/${ev.slug}`} key={ev.id} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="relative h-50 overflow-hidden">
                          <img
                            src={ev.bannerUrl && `${STORAGE_URL}/${ev.bannerUrl}`}
                            alt={ev.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute flex items-start justify-between top-2 w-auto left-0 right-0 py-0.5 px-2.5">
                            <div className='bg-white w-max py-0.5 px-1.5 rounded shadow-lg'>
                              <div className='flex flex-col justify-start items-center'>
                                {/* 3. Plug the exact variables directly into your UI */}
                                <p className="text-lg md:text-xl tracking-tighter font-extrabold">
                                  {badgeDay}
                                </p>
                                <p className="-mt-1.5 text-xs md:text-sm font-light uppercase">
                                  {badgeMonth}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col grow">
                          <h4 className="text-theme text-sm font-bold mb-1 uppercase tracking-wide">
                            {formattedDate} - <span className="text-primary font-light">{to12HourFormat(ev.startTime)}</span>
                          </h4>

                          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                            {ev.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-1">
                            {ev.venueAddress}, <span className="capitalize">{ev.city}</span>
                          </p>
                          <div className="mt-auto pt-4 flex flex-col gap-1">
                            <p className="text-gray-500 text-xs flex items-center mt-1">
                              {ev.organiser.organiserName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )
                  }) : <EmptyState />}
                </div>
              )}
            </Await>
          </Suspense>
          <div className="mt-10 flex justify-center">
            <Button size={"lg"}>
              See more events
            </Button>

          </div>
        </div>
        <div>
          <Text.h3 className="mb-6">Browse by Genre</Text.h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, idx) => (
              <a href="#" key={idx} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:shadow-md hover:border-gray-400 transition-all text-gray-700 font-medium">
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};