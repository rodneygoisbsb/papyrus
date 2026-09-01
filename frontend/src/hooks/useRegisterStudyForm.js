import { useState, useEffect } from 'react';
import { calculateAccuracyRate, addTimeToDuration } from '../utils/studyCalculations';

export function useRegisterStudyForm({ isOpen, recordedTime, initialTime, initialData, onSave }) {
    const [disciplina, setDisciplina] = useState('');
    const [topico, setTopico] = useState('');
    const [tipoEstudo, setTipoEstudo] = useState('Teoria');
    const [horas, setHoras] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [materiais, setMateriais] = useState([]);
    const [questoesFeitas, setQuestoesFeitas] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [revisoes, setRevisoes] = useState([]);
    const [agendarEmBloco, setAgendarEmBloco] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

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

            if (recordedTime) {
                // assume 'HH:MM:SS'
                const partes = recordedTime.split(':');
                if (partes.length === 3) {
                    setHoras(parseInt(partes[0], 10) || 0);
                    setMinutos(parseInt(partes[1], 10) || 0);
                } else if (partes.length === 2) {
                    // MM:SS
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
    }, [isOpen, recordedTime, initialTime]);

    const adicionarTempo = (minsToAdd) => {
        const { hours, minutes } = addTimeToDuration(horas, minutos, minsToAdd);
        setHoras(hours);
        setMinutos(minutes);
    };

    const alternarCiclo = (cicloId) => {
        setRevisoes((prev) =>
            prev.includes(cicloId)
                ? prev.filter((id) => id !== cicloId)
                : [...prev, cicloId]
        );
    };

    const alternarMaterial = (materialId) => {
        setMateriais((prev) =>
            prev.includes(materialId)
                ? prev.filter((id) => id !== materialId)
                : [...prev, materialId]
        );
    };

    const incrementarQuestoes = (valor) => setQuestoesFeitas(Math.max(0, questoesFeitas + valor));
    const incrementarAcertos = (valor) => setAcertos(Math.max(0, acertos + valor));

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
            onSave({
                disciplina,
                topico,
                tipoEstudo,
                duracao: { horas, minutos },
                materiais,
                questoes: { feitas: questoesFeitas, acertos },
                revisoesAgendadas: revisoes,
                agendarEmBloco
            });
            setIsSaving(false);
        }, 800);
    };

    const taxaAcertos = calculateAccuracyRate(acertos, questoesFeitas);

    return {
        disciplina, setDisciplina,
        topico, setTopico,
        tipoEstudo, setTipoEstudo,
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
