import { RiHeart2Fill } from "@remixicon/react";
import VideoBanner from "./video-banner";
import SearchBox from "./search-box";
import { Text } from "~/components/ui/text";

const LandingPage = () => {
  const events = [
    {
      id: 1,
      title: "Mainland Block Party - Summer Edition",
      date: "FRI, MAY 8 • 7:00 PM",
      location: "Secret Garden, Ikeja",
      price: "Starts at ₦5,000",
      organizer: "BlockParty Africa",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Afrobeats Live Showcase 2026",
      date: "SAT, MAY 16 • 6:00 PM",
      location: "Eko Convention Center, VI",
      price: "Starts at ₦15,000",
      organizer: "Live Nation Africa",
      image: "https://images.unsplash.com/photo-1493225457224-eda0e6fd6563?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Jazz in the Park - Sunday Sessions",
      date: "SUN, MAY 17 • 4:00 PM",
      location: "Muri Okunola Park, Victoria Island",
      price: "Free",
      organizer: "Lagos Jazz Society",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Underground Electronic Night",
      date: "FRI, MAY 22 • 10:00 PM",
      location: "The Basement, Lekki Phase 1",
      price: "Starts at ₦8,000",
      organizer: "Volt Freq",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <Text.h2>
              Popular Music Events in <span className="text-theme">Lagos</span>
            </Text.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-theme transition-colors z-10">
                    <RiHeart2Fill />
                  </button>
                </div>
                <div className="p-4 flex flex-col grow">
                  <h4 className="text-theme text-sm font-bold mb-1 uppercase tracking-wide">{event.date}</h4>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">{event.location}</p>
                  <div className="mt-auto pt-4 flex flex-col gap-1">
                    <p className="text-gray-900 text-sm font-medium">{event.price}</p>
                    <p className="text-gray-500 text-xs flex items-center mt-1">
                      {event.organizer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="border border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900 px-8 py-3 rounded font-semibold transition-colors">
              See more events
            </button>
            {/* <Button variant={'outline'} className="px-8 py-6 border-2 border-gray-300">
              See more events
            </Button> */}
          </div>
        </div>
        <div>
          <Text.h3 className="mb-6">Browse by Genre</Text.h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, idx) => (
              <a href="#" key={idx} className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-5 py-3 hover:shadow-md hover:border-gray-400 transition-all text-gray-700 font-medium">
                <i className={`${category.icon} text-lg text-gray-500`}></i>
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;