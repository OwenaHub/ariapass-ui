import { useState, useEffect } from 'react';
import { Text } from '../ui/text';

const SlideShow = () => {
    const slides = [
        {
            id: 1,
            image: "/images/banners/john-onaeko.jpg",
            text: "We promote live music concerts, events and festivals 🩷",
        },
        {
            id: 2,
            image: "/images/banners/martin-widenka.jpg",
            text: "Discover unique genres and talented artists in our community 💛",
        },
        {
            id: 3,
            image: "/images/banners/sam-moghadam.jpg",
            text: "Collaborate with your event staff and manage bookings seamlessly ❤️",
        },
    ];

    const DURATION = 5000;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, DURATION);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.text}
                        loading={index === 0 || index === currentIndex ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
                </div>
            ))}

            <style>
                {`
                    @keyframes slideProgress {
                        0% { width: 0%; }
                        100% { width: 100%; }
                    }
                `}
            </style>
            <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-20">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
                    >
                        <div
                            className="h-full bg-white shadow-sm origin-left"
                            style={{
                                width: index < currentIndex ? '100%' : '0%',
                                animation: index === currentIndex
                                    ? `slideProgress ${DURATION}ms linear forwards`
                                    : 'none'
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 left-4 md:left-8 right-4 md:right-8 z-20">
                <Text.small className='text-white mb-2'>
                    #music #concert #ariapass #soldout #livemusic 
                </Text.small>
                <h2
                    key={currentIndex}
                    className="text-white text-3xl font-medium tracking-tight drop-shadow-lg animate-fade-in"
                >
                    {slides[currentIndex].text}
                </h2>
            </div>

        </div>
    );
};

export default SlideShow;