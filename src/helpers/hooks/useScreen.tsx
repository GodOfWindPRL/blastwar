import { useEffect, useState } from 'react'

const useWidthScreen = () => {
    const isClient = typeof window === 'object';
    function getSize() {
        const width = window.innerWidth
        const height = window.innerHeight
        return { width, height }
    }
    const [windowSize, setWindowSize] = useState(getSize);
    useEffect(() => {
        if (!isClient) {
            return;
        }
        function handleResize() {
            setWindowSize(getSize());
        }
        window.addEventListener('resize', handleResize);
        // window.addEventListener('orientationchange', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
            // window.removeEventListener('orientationchange', handleResize)
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return { width: windowSize.width, height: windowSize.height };
}

export { useWidthScreen }
