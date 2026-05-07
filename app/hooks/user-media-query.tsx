import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks the state of a CSS media query.
 *
 * @param {string} query - The media query string to watch (e.g., "(min-width: 768px)").
 * @returns {boolean} - `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query: string) => {
    // State to store whether the media query matches or not.
    // We initialize it to false, and the useEffect will correct it on the client-side.
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // We only want to run this logic in the browser.
        if (typeof window === 'undefined') {
            return;
        }

        // The 'window.matchMedia' API is the core of this hook.
        // It returns a MediaQueryList object that we can use to check the query status.
        const mediaQueryList = window.matchMedia(query);

        // This handler function will be called whenever the media query status changes.
        const handleStatusChange = (event: any) => {
            setMatches(event.matches);
        };

        // --- Set the initial state ---
        // We check the initial state of the query when the component mounts for the first time.
        // This handles the case where the page loads on a screen that already matches the query.
        setMatches(mediaQueryList.matches);

        // --- Subscribe to future changes ---
        // We add an event listener that will call our handler whenever the viewport
        // size changes in a way that affects the media query.
        // Using 'addEventListener' is the modern, recommended approach.
        mediaQueryList.addEventListener('change', handleStatusChange);

        // --- Cleanup function ---
        // This is a critical step. The function returned by useEffect will be called
        // when the component unmounts. We remove the event listener here to prevent
        // memory leaks.
        return () => {
            mediaQueryList.removeEventListener('change', handleStatusChange);
        };
    }, [query]); // The effect re-runs only if the `query` string changes.

    return matches;
};