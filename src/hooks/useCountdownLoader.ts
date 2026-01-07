import { useState } from "react";

export function useCountdownLoader( startingHours: number, startingMinutes: number, startingSeconds: number ) {
    const [loaderCountdown, setLoaderCountdown] = useState({
        hours: startingHours,
        minutes: startingMinutes,
        seconds: startingSeconds
    }); // time to load for countdown

    const [timerValue, setTimerValue] = useState('0:00:00');

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoaderCountdown(prev => ({
            ...prev,
            [name]: Number(value)
        }))
    }

    function normalizeTime(hours: number, minutes: number, seconds: number) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;

        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        return { hours, minutes, seconds }
    }

    function onLoad() {
        const { hours, minutes, seconds } = normalizeTime(Number(loaderCountdown.hours), Number(loaderCountdown.minutes), Number(loaderCountdown.seconds));
        setTimerValue(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }

    return {
        loaderCountdown,
        onChange,
        onLoad,
        timerValue,
        setLoaderCountdown
    };
}

