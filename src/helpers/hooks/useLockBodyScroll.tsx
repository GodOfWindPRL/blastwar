import { useLayoutEffect } from "react";

export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        // Get original body overflow
        const originalStyle = window.getComputedStyle(document.documentElement).overflow
        // Prevent scrolling on mount
        document.documentElement.style.overflow = 'hidden'
        // Re-enable scrolling when component unmounts
        return () => { document.documentElement.style.overflow = originalStyle };
    }, []);
}
