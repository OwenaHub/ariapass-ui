import React, { useState, useEffect } from 'react';

export default function VideoBanner() {
    const phrases = [
        "Experience the best live music in Lagos 🫶🏽",
        "Discover underground artists and festivals 🎹",
        "Secure your tickets instantly today 🎟️",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    // Start with false so the very first phrase animates in smoothly on page load
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 1. SHOW: Trigger the entrance animation shortly AFTER the text mounts
        // This 50ms buffer gives the browser time to paint the invisible state first
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        // 2. HIDE: Start fading the text out after 3.5 seconds
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3500);

        // 3. SWAP: Change the text AFTER the fade-out animation fully finishes.
        // We use 5500ms (3.5s display + 2s buffer) because long phrases 
        // with staggered delays need extra time to completely fade out.
        const swapTimer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 5500);

        // Cleanup timers to prevent memory leaks or overlapping animations
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            clearTimeout(swapTimer);
        };
    }, [currentIndex]);

    const currentWords = phrases[currentIndex].split(' ');

    return (
        <div className="relative h-110 w-full md:mt-8 md:rounded-2xl overflow-hidden bg-gray-900">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/ariapass-atf/placeholder.jpg"
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/ariapass-atf/video.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>

            {/* Animated Text Container */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
                {/* Added 'flex flex-wrap justify-center' to ensure smooth wrapping on mobile */}
                <h1 className="text-4xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl drop-shadow-lg flex flex-wrap justify-start">
                    {currentWords.map((word, index) => (
                        <span
                            key={`${currentIndex}-${index}`}
                            className={`inline-block transition-all duration-700 ease-in-out
                                ${isVisible
                                    ? 'opacity-100 translate-y-0 blur-none'
                                    : 'opacity-0 translate-y-8 blur-sm'}
                            `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {word}&nbsp;
                        </span>
                    ))}
                </h1>
            </div>
        </div>
    );
}