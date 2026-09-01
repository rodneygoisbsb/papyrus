import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente de Contador Numérico Suavizado (Soft KPI)
 */
export default function AnimatedCounter({ value, duration = 700, decimals = 0, padZeros = 0 }) {
    const [displayValue, setDisplayValue] = useState(Number(value) || 0);
    const prevValueRef = useRef(Number(value) || 0);

    useEffect(() => {
        const startVal = prevValueRef.current;
        const endVal = Number(value) || 0;
        prevValueRef.current = endVal;

        if (startVal === endVal) return;

        let startTime = null;
        let animationFrameId;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = startVal + (endVal - startVal) * easeProgress;

            setDisplayValue(currentNumber);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayValue(endVal);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [value, duration]);

    const rawRounded = Math.round(displayValue);
    const formatted = decimals > 0
        ? displayValue.toFixed(decimals)
        : (padZeros > 0 ? String(rawRounded).padStart(padZeros, '0') : rawRounded);

    return (
        <span className="tabular-nums font-['Plus_Jakarta_Sans']">
            {formatted}
        </span>
    );
}
