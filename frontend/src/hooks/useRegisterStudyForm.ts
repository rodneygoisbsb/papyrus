import { useState, useEffect } from 'react';
import { calculateAccuracyRate, addTimeToDuration } from '../utils/studyCalculations';

export interface RegisterStudyData {
    disciplina: string;
    topico: string;
    tipoEstudo: string;
    duracao: { horas: number; minutos: number };
    materiais: string[];
    questoes: { feitas: number; acertos: number };
    revisoesAgendadas: string[];
    agendarEmBloco: boolean;
    dataEstudo: string;
}

export interface UseRegisterStudyFormProps {
    isOpen: boolean;
    recordedTime?: string;
    initialTime?: { hours?: number; minutes?: number };
    initialData?: Record<string, any>;
    onSave: (data: RegisterStudyData) => void;
}

export function useRegisterStudyForm({ isOpen, recordedTime, initialTime, initialData, onSave }: UseRegisterStudyFormProps) {
    const [disciplina, setDisciplina] = useState<string>('');
    const [topico, setTopico] = useState<string>('');
    const [tipoEstudo, setTipoEstudo] = useState<string>('Teoria');
    const [dataEstudo, setDataEstudo] = useState<string>(new Date().toISOString().split('T')[0]);
    const [horas, setHoras] = useState<number>(0);
    const [minutos, setMinutos] = useState<number>(0);
    const [materiais, setMateriais] = useState<string[]>([]);
    const [questoesFeitas, setQuestoesFeitas] = useState<number | ''>(0);
    const [acertos, setAcertos] = useState<number | ''>(0);
    const [revisoes, setRevisoes] = useState<string[]>([]);
    const [agendarEmBloco, setAgendarEmBloco] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    // Usar um ref para evitar que a inicialização rode múltiplas vezes se as props mudarem a referência (como objetos anônimos)
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setDisciplina(initialData?.subject || '');
            setTopico(initialData?.topicName || initialData?.topicoNome || '');

            let tipo = 'Teoria';
            if (initialData?.type === 'REVISION') tipo = 'Revisão';
            if (initialData?.type === 'QUESTIONS') tipo = 'Questões';
            setTipoEstudo(tipo);

            setMateriais([]);
            setQuestoesFeitas(0);
            setAcertos(0);
            setRevisoes([]);
            setAgendarEmBloco(false);
            setIsSaving(false);
            setDataEstudo(new Date().toISOString().split('T')[0]);

            if (recordedTime) {
                const partes = recordedTime.split(':');
                if (partes.length === 3) {
                    setHoras(parseInt(partes[0], 10) || 0);
                    setMinutos(parseInt(partes[1], 10) || 0);
                } else if (partes.length === 2) {
                    setHoras(0);
                    setMinutos(parseInt(partes[0], 10) || 0);
                } else {
                    setHoras(0);
                    setMinutos(0);
                }
            } else if (initialTime) {
                setHoras(initialTime.hours || 0);
                setMinutos(initialTime.minutes || 0);
            } else {
                setHoras(0);
                setMinutos(0);
            }
        }
        // Queremos rodar isso apenas quando o modal for aberto ou os dados iniciais passados explicitamente mudarem.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]); // Dependências reduzidas para evitar resets indevidos

    const adicionarTempo = (minsToAdd: number) => {
        const { hours, minutes } = addTimeToDuration(horas, minutos, minsToAdd);
        setHoras(hours);
        setMinutos(minutes);
    };

    const alternarCiclo = (cicloId: string) => {
        setRevisoes((prev) =>
            prev.includes(cicloId)
                ? prev.filter((id) => id !== cicloId)
                : [...prev, cicloId]
        );
    };

    const alternarMaterial = (materialId: string) => {
        setMateriais((prev) =>
            prev.includes(materialId)
                ? prev.filter((id) => id !== materialId)
                : [...prev, materialId]
        );
    };

    const incrementarQuestoes = (valor: number) => {
        const atual = typeof questoesFeitas === 'number' ? questoesFeitas : 0;
        setQuestoesFeitas(Math.max(0, atual + valor));
    };
    const incrementarAcertos = (valor: number) => {
        const atual = typeof acertos === 'number' ? acertos : 0;
        setAcertos(Math.max(0, atual + valor));
    };

    const handleSalvar = () => {
        if (!disciplina.trim()) {
            alert('A disciplina é obrigatória.');
            return;
        }

        if (horas === 0 && minutos === 0) {
            alert('Informe a duração do estudo.');
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            const finalQuestoes = typeof questoesFeitas === 'number' ? questoesFeitas : 0;
            const finalAcertos = typeof acertos === 'number' ? acertos : 0;

            onSave({
                disciplina,
                topico,
                tipoEstudo,
                duracao: { horas, minutos },
                materiais,
                questoes: { feitas: finalQuestoes, acertos: finalAcertos },
                revisoesAgendadas: revisoes,
                agendarEmBloco,
                dataEstudo
            });
            setIsSaving(false);
        }, 800);
    };

    const taxaAcertos = calculateAccuracyRate(
        typeof acertos === 'number' ? acertos : 0,
        typeof questoesFeitas === 'number' ? questoesFeitas : 0
    );

    return {
        disciplina, setDisciplina,
        topico, setTopico,
        tipoEstudo, setTipoEstudo,
        dataEstudo, setDataEstudo,
        horas, setHoras,
        minutos, setMinutos,
        materiais,
        questoesFeitas, setQuestoesFeitas,
        acertos, setAcertos,
        revisoes,
        agendarEmBloco, setAgendarEmBloco,
        isSaving,
        adicionarTempo,
        alternarCiclo,
        alternarMaterial,
        incrementarQuestoes,
        incrementarAcertos,
        handleSalvar,
        taxaAcertos
    };
}
