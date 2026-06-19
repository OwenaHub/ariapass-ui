import VideoBanner from "./video-banner";
import type { Route } from "../_guest._index/+types/route";
import { RiSearchAi2Line, RiFireFill } from "@remixicon/react";
import CategoryCard from "./category-card";
import { dateCategories, genreCategories, upcomingEventCategory } from "../../lib/categories";
import OrganiserPromoCard from "~/components/cards/organiser-promo-card";
import { Text } from "~/components/ui/text";
import GenreCard from "./genre-card";
import { extractNames } from "~/lib/utils";
import AvatarGroup from "~/components/custom/avatar-group";
import { Button } from "~/components/ui/button";
import { eventCategory } from "~/lib/static.data";
import { Link } from "react-router";
import dayjs from "dayjs";

export default function LandingPage({ }: Route.ComponentProps) {

  const dummyUsers: Partial<EventMember>[] = [
    { name: "Alice Johnson" },
    { name: "Bob Smith" },
    { name: "Charlie Davis" },
    { name: "Diana Evans" },
    { name: "Ethan Brown" }
  ];

  const upcoming = upcomingEventCategory[0];

  return (
    <div>
      <div className="relative">
          <VideoBanner />
      </div>

      <main className="container">
        <div className="my-8">
          <div className="overflow-x-auto scrollbar-hide flex items-stretch gap-3 no-scrollbar">
            <div className="shrink-0 flex text-nowrap items-center gap-2 p-2 rounded-full bg-theme">
              <span className="font-medium text-white text-sm">
                <RiSearchAi2Line size={20} />
              </span>
            </div>
            {eventCategory.map((category) => (
              <Link key={category} to={`/events/?category=${category.toLowerCase()}`} className="hover:border-theme hover:bg-theme-bg cursor-pointer shrink-0 flex text-nowrap items-center gap-2 px-3 py-1.5 rounded border border-gray-400 transition">
                <span className="text-sm font-medium text-gray-800">{category}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar w-full">
            {dateCategories.map((category) => (
              <div key={category.title} className="shrink-0 snap-start">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-to-l from-white to-transparent" />
        </div>

        <section className="my-16 md:my-24">
          <div className="relative w-full bg-theme rounded flex flex-col md:flex-row items-center shadow-2xl shadow-theme/30 mt-12 md:mt-0">

            {/* Decorative bold watermark (Adds texture without clutter) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-10 rounded-[2.5rem]">
              <span className="block text-[120px] md:text-[200px] font-black tracking-tighter text-white whitespace-nowrap leading-none select-none translate-y-[-20%]">
                ARIAPASS NEXT
              </span>
            </div>

            {/* LEFT: Punchy Content */}
            <div className="relative z-20 w-full md:w-1/2 p-8 md:p-16 lg:p-20 text-white">
              <div className="flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-theme shadow-lg">
                  <RiFireFill className="text-orange-500" size={20} />
                </span>
                <span className="font-black tracking-widest uppercase text-sm text-white/90">
                  The Hot List
                </span>
              </div>

              <Text.h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-8">
                {upcoming.title}.
              </Text.h2>

              <Text.p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-md leading-relaxed">
                The shows everyone is talking about. Happening from <span className="text-white underline decoration-2 underline-offset-4">{dayjs(upcoming.startDate).format('MMM D')}</span> to <span className="text-white underline decoration-2 underline-offset-4">{dayjs(upcoming.endDate).format('MMM D')}</span>.
              </Text.p>

              <Link to={`/events/?startDate=${upcoming.startDate}&endDate=${upcoming.endDate}`}>
                <Button size="lg" className="bg-white text-theme hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 rounded px-12 py-6 text-lg font-black shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  See Events
                </Button>
              </Link>
            </div>

            <div className="relative w-full md:w-1/2 h-80 md:h-125 self-end md:self-center z-30 group">
              <div className="absolute inset-0 md:-top-12 md:-bottom-12 md:-right-8 md:left-0 rounded overflow-hidden shadow-2xl border-4 border-white/10 md:rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
                <img
                  src={upcoming.bannerUrl}
                  alt={upcoming.title}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-theme mix-blend-overlay opacity-30 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </section>

        <OrganiserPromoCard />

        <section className="mb-8">
          <Text.h3 className="mb-5 mt-10">
            Recommended for you
          </Text.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            <GenreCard category={genreCategories[0]} />
            {genreCategories.slice(1).map((category) => (
              <GenreCard key={category.title} category={category} />
            ))}
          </div>
        </section>

        <section className="border p-5 flex flex-col lg:flex-row lg:justify-between items-center gap-5 rounded">
          <div className="flex flex-col lg:flex-row items-center gap-5">
            <AvatarGroup size="xl" names={extractNames(dummyUsers)} max={3} />
            <Text.h3 className="text-center md:text-2xl! lg:text-start font-bold!">
              Get your interest aligned with our recommendations
            </Text.h3>
          </div>
          <Link to={"/register"}>
            <Button
              size="lg"
              className="px-10"
              variant={'brand'}
            >
              Register now
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}