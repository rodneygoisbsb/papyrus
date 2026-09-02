import { useEffect, useRef } from 'react';

export function useModalLenis() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const Lenis = (window as any).Lenis;
        if (!Lenis || !wrapperRef.current || !contentRef.current) return;

        const lenis = new Lenis({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            lerp: 0.1,
            smoothWheel: true,
        });

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return { wrapperRef, contentRef };
}
