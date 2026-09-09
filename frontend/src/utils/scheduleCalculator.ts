type RelevanceData = Record<string, { importance: number, knowledge: number }>;

export function calculateDisciplinePercentages(disciplines: string[], relevance: RelevanceData) {
    const weights = disciplines.map(disc => {
        const rel = relevance[disc] || { importance: 3, knowledge: 3 };
        const weight = rel.importance * (6 - rel.knowledge);
        return { disc, weight };
    });
    const totalWeight = weights.reduce((acc, curr) => acc + curr.weight, 0);
    return weights.map(w => ({
        disc: w.disc,
        pct: totalWeight > 0 ? Math.round((w.weight / totalWeight) * 100) : 0
    })).sort((a, b) => b.pct - a.pct);
}