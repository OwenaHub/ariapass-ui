import VideoBanner from "./video-banner";
import type { Route } from "../_guest._index/+types/route";
import { RiMusicLine } from "@remixicon/react";
import CategoryCard from "./category-card";
import { dateCategories, genreCategories } from "./categories";
import OrganiserPromoCard from "~/components/cards/organiser-promo-card";
import { Text } from "~/components/ui/text";
import GenreCard from "./genre-card";
import { extractNames } from "~/lib/utils";
import AvatarGroup from "~/components/custom/avatar-group";
import { Button } from "~/components/ui/button";
import { eventCategory } from "~/lib/static.data";
import { Link } from "react-router";

export default function LandingPage({ }: Route.ComponentProps) {

  const dummyUsers: Partial<EventMember>[] = [
    { name: "Alice Johnson" },
    { name: "Bob Smith" },
    { name: "Charlie Davis" },
    { name: "Diana Evans" },
    { name: "Ethan Brown" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto md:px-8">
          <VideoBanner />
        </div>
      </div>

      <main className="container">
        <div className="my-8">
          <div className="overflow-x-auto scrollbar-hide flex items-stretch gap-3 no-scrollbar">
            <div className="shrink-0 flex text-nowrap items-center gap-2 p-2 rounded bg-theme">
              <span className="font-medium text-white text-sm">
                <RiMusicLine size={20} />
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

          {/* Right fade */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-linear-to-l from-white to-transparent" />
        </div>

        <OrganiserPromoCard />

        <section className="mb-8">
          <Text.h3 className="font-extrabold! mb-5 mt-10">
            Recommended for you
          </Text.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {genreCategories.map((category) => (
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
            </Button></Link>
        </section>
      </main>
    </div>
  );
};