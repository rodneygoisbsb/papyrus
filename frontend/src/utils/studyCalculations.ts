/**
 * Calcula a porcentagem do progresso semanal em relação à meta.
 * Limita entre 0 e 100 e retorna um inteiro.
 */
export const calculateWeeklyProgress = (hoursStudied: number, goalHours: number): number => {
    if (!goalHours || goalHours <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((hoursStudied / goalHours) * 100)));
};

/**
 * Recebe o nome de uma matéria e retorna a classe Tailwind (DaisyUI) de borda correspondente.
 */
export const getSubjectAccent = (subjectName: string = ''): { border: string } => {
    const upper = (subjectName || '').toUpperCase();
    if (upper.includes('CONSTITUCIONAL')) return { border: 'border-l-primary' };
    if (upper.includes('ADMINISTRATIVO')) return { border: 'border-l-accent' };
    if (upper.includes('PORTUGUESA') || upper.includes('PORTUGUÊS')) return { border: 'border-l-success' };
    if (upper.includes('PENAL')) return { border: 'border-l-primary' };
    if (upper.includes('RACIOCÍNIO') || upper.includes('LÓGICA')) return { border: 'border-l-error' };
    return { border: 'border-l-primary' }; // default
};

/**
 * Retorna as classes Tailwind para os níveis (0 a 4) do Heatmap (matriz de constância).
 */
export const getHeatmapLevelColor = (level: number): string => {
    switch (level) {
        case 1: return 'bg-primary/15 border border-primary/25';
        case 2: return 'bg-primary/40';
        case 3: return 'bg-primary/80';
        case 4: return 'bg-primary';
        default: return 'bg-base-200/90 border border-base-300/40';
    }
};

/**
 * Retorna a porcentagem de acertos arredondada.
 */
export const calculateAccuracyRate = (correct: number, total: number): number => {
    if (!total || total <= 0) return 0;
    return Math.round((correct / total) * 100);
};

export interface Duration {
    hours: number;
    minutes: number;
}

/**
 * Soma minutos a um objeto de horas e minutos e retorna o novo total formatado.
 */
export const addTimeToDuration = (currentHours: number, currentMinutes: number, minutesToAdd: number): Duration => {
    const totalMinutes = (Number(currentHours) * 60) + Number(currentMinutes) + minutesToAdd;
    return {
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60
    };
};

/**
 * Converte string para Title Case, ignorando palavras menores como 'de', 'da', etc.
 */
export const toTitleCase = (str: string): string => {
    if (!str) return '';
    const minorWords = ['de', 'do', 'da', 'dos', 'das', 'e', 'em', 'na', 'no', 'nas', 'nos', 'a', 'o', 'as', 'os', 'por', 'para', 'com'];
    return str.toLowerCase().split(' ').map((word, index) => {
        if (index !== 0 && minorWords.includes(word)) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};
