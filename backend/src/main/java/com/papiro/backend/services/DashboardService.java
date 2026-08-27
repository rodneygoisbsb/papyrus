package com.papiro.backend.services;

import com.papiro.backend.dtos.DashboardHomeResponseDTO;
import com.papiro.backend.dtos.DashboardHomeResponseDTO.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    public DashboardHomeResponseDTO obterResumoAbaInicio(Long planoId) {
        LocalDate hoje = LocalDate.now();
        Long idFinal = (planoId != null) ? planoId : 1L;

        // Metas do Dia (Mock inicial resiliente para compilação e teste imediato da UI)
        List<ItemMetaHomeDTO> metasDoDia = List.of(
                new ItemMetaHomeDTO(
                        1L,
                        101L,
                        "DIREITO CONSTITUCIONAL",
                        "#1E60F6",
                        "border-l-primary",
                        "Direitos e Garantias Fundamentais (Art. 5º)",
                        "Alta Incidência",
                        "THEORY",
                        null,
                        90,
                        false,
                        "https://www.tecconcursos.com.br",
                        "https://www.grancursosonline.com.br",
                        "#",
                        "<h3>Pegadinha:</h3><p>Inviolabilidade do domicílio à noite.</p>",
                        "<h3>Art. 5º</h3><p>Homens e mulheres iguais.</p>"),
                new ItemMetaHomeDTO(
                        2L,
                        102L,
                        "DIREITO ADMINISTRATIVO",
                        "#FF7A1A",
                        "border-l-accent",
                        "Lei 8.112/90 - Regime Disciplinar e Responsabilidades",
                        "Alta Incidência",
                        "THEORY",
                        null,
                        60,
                        false,
                        "https://www.tecconcursos.com.br",
                        "",
                        "#",
                        "",
                        ""));

        // Revisões do Dia
        List<ItemMetaHomeDTO> revisoesDoDia = List.of(
                new ItemMetaHomeDTO(
                        3L,
                        103L,
                        "LÍNGUA PORTUGUESA",
                        "#00D084",
                        "border-l-secondary",
                        "Emprego do Sinal Indicativo de Crase",
                        "Alta Incidência",
                        "REVISION",
                        "Revisão 7 dias",
                        45,
                        false,
                        "https://www.tecconcursos.com.br",
                        "https://www.grancursosonline.com.br",
                        "#",
                        "<p>Não usar crase antes de pronomes de tratamento.</p>",
                        "<p>Crase = A + A.</p>"),
                new ItemMetaHomeDTO(
                        4L,
                        104L,
                        "RACIOCÍNIO LÓGICO",
                        "#F43F5E",
                        "border-l-error",
                        "Equivalências Lógicas e Negações de Proposições",
                        "Média Incidência",
                        "REVISION",
                        "Revisão 24h",
                        30,
                        false,
                        "https://www.tecconcursos.com.br",
                        "",
                        "#",
                        "",
                        ""));

        // Heatmap de Constância (28 dias)
        List<ConstanciaDiaDTO> constancia = new ArrayList<>();
        LocalDate dataInicial = hoje.minusDays(27);
        for (int i = 0; i < 28; i++) {
            LocalDate dataRef = dataInicial.plusDays(i);
            boolean ativo = (i % 4 != 0); // Mock alternado
            constancia.add(new ConstanciaDiaDTO(dataRef, i + 1, ativo, ativo ? 90 : 0));
        }

        return new DashboardHomeResponseDTO(
                idFinal,
                idFinal == 1L ? "PM-DF Oficial" : "Plano BB (Agente de Tecnologia)",
                12,
                new EstudoSemanalDTO(14.0, 25.0, 56),
                new DesempenhoQuestoesDTO(81.7, 98, 120, 4.2),
                new EstudosHojeDTO(90, 35, false),
                metasDoDia,
                revisoesDoDia,
                constancia);
    }
}