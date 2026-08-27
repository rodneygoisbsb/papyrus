package com.papiro.backend.dtos;

import java.time.LocalDate;
import java.util.List;

public record DashboardHomeResponseDTO(
        Long planoId,
        String planoTitulo,
        int diasConstancia,
        EstudoSemanalDTO estudoSemanal,
        DesempenhoQuestoesDTO desempenhoQuestoes,
        EstudosHojeDTO estudosHoje,
        List<ItemMetaHomeDTO> metasDoDia,
        List<ItemMetaHomeDTO> revisoesDoDia,
        List<ConstanciaDiaDTO> constanciaUltimos28Dias) {
    public record EstudoSemanalDTO(
            double horasEstudadas,
            double horasMeta,
            int percentualProgresso) {
    }

    public record DesempenhoQuestoesDTO(
            double taxaAcerto,
            int questoesCorretas,
            int questoesTotais,
            double variacaoSemanalPercentual) {
    }

    public record EstudosHojeDTO(
            int minutosEstudados,
            int questoesFeitas,
            boolean emExecucao) {
    }

    public record ItemMetaHomeDTO(
            Long id,
            Long topicId,
            String materia,
            String corHex,
            String borderClass,
            String topicoNome,
            String importancia,
            String tipo,
            String revisionTag,
            int duracaoMinutos,
            boolean concluida,
            String tecUrl,
            String videoUrl,
            String pdfUrl,
            String errorNotes,
            String summaryNotes) {
    }

    public record ConstanciaDiaDTO(
            LocalDate data,
            int diaNumero,
            boolean ativo,
            int minutosEstudados) {
    }
}