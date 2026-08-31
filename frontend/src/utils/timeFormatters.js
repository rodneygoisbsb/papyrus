/**
 * Converte segundos acumulados para "MM:SS" (padrão) ou "HH:MM:SS" (se forceHours for true ou tiver horas).
 */
export const formatTimeDisplay = (totalSecs, forceHours = false) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hrs > 0 || forceHours) {
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Converte segundos em string no formato "HH:MM:SS" usando Data/ISO (útil para gravações no modal).
 */
export const secondsToTimeString = (totalSecs) => {
    return new Date(totalSecs * 1000).toISOString().substring(11, 19);
};

/**
 * Formata segundos (regressivos ou não) no formato "MM:SS".
 */
export const formatPomodoroTimer = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
