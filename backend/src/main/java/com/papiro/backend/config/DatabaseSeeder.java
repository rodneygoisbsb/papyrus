package com.papiro.backend.config;

import com.papiro.backend.models.DailyGoal;
import com.papiro.backend.repositories.DailyGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

        private final DailyGoalRepository dailyGoalRepository;

        @Override
        public void run(String... args) {
                if (dailyGoalRepository.count() == 0) {
                        LocalDate hoje = LocalDate.now();

                        List<DailyGoal> metasIniciais = List.of(
                                        DailyGoal.builder()
                                                        .planId(1L)
                                                        .subject("DIREITO CONSTITUCIONAL")
                                                        .subjectColor("#1E60F6")
                                                        .topicName("Direitos e Garantias Fundamentais (Art. 5º)")
                                                        .importance("Alta Incidência")
                                                        .type("THEORY")
                                                        .durationMinutes(90)
                                                        .actualDurationMinutes(90)
                                                        .questionsTotal(20)
                                                        .questionsCorrect(18)
                                                        .completed(false)
                                                        .targetDate(hoje)
                                                        .scheduledDate(hoje)
                                                        .tecUrl("https://www.tecconcursos.com.br")
                                                        .videoUrl("https://www.grancursosonline.com.br")
                                                        .pdfUrl("#")
                                                        .errorNotes("<h3>Pegadinha:</h3><p>Inviolabilidade do domicílio à noite.</p>")
                                                        .summaryNotes("<h3>Art. 5º</h3><p>Homens e mulheres iguais.</p>")
                                                        .build(),

                                        DailyGoal.builder()
                                                        .planId(1L)
                                                        .subject("DIREITO ADMINISTRATIVO")
                                                        .subjectColor("#FF7A1A")
                                                        .topicName("Lei 8.112/90 - Regime Disciplinar e Responsabilidades")
                                                        .importance("Alta Incidência")
                                                        .type("THEORY")
                                                        .durationMinutes(60)
                                                        .actualDurationMinutes(60)
                                                        .questionsTotal(15)
                                                        .questionsCorrect(12)
                                                        .completed(false)
                                                        .targetDate(hoje)
                                                        .scheduledDate(hoje)
                                                        .tecUrl("https://www.tecconcursos.com.br")
                                                        .videoUrl("")
                                                        .pdfUrl("#")
                                                        .build(),

                                        DailyGoal.builder()
                                                        .planId(1L)
                                                        .subject("LÍNGUA PORTUGUESA")
                                                        .subjectColor("#00D084")
                                                        .topicName("Emprego do Sinal Indicativo de Crase")
                                                        .importance("Alta Incidência")
                                                        .type("REVISION")
                                                        .revisionTag("Revisão 7 dias")
                                                        .durationMinutes(45)
                                                        .actualDurationMinutes(45)
                                                        .questionsTotal(10)
                                                        .questionsCorrect(9)
                                                        .completed(false)
                                                        .targetDate(hoje)
                                                        .scheduledDate(hoje)
                                                        .tecUrl("https://www.tecconcursos.com.br")
                                                        .videoUrl("https://www.grancursosonline.com.br")
                                                        .pdfUrl("#")
                                                        .errorNotes("<p>Não usar crase antes de pronomes de tratamento.</p>")
                                                        .summaryNotes("<p>Crase = A + A.</p>")
                                                        .build(),

                                        DailyGoal.builder()
                                                        .planId(1L)
                                                        .subject("RACIOCÍNIO LÓGICO")
                                                        .subjectColor("#F43F5E")
                                                        .topicName("Equivalências Lógicas e Negações de Proposições")
                                                        .importance("Média Incidência")
                                                        .type("REVISION")
                                                        .revisionTag("Revisão 24h")
                                                        .durationMinutes(30)
                                                        .actualDurationMinutes(30)
                                                        .questionsTotal(10)
                                                        .questionsCorrect(8)
                                                        .completed(false)
                                                        .targetDate(hoje)
                                                        .scheduledDate(hoje)
                                                        .tecUrl("https://www.tecconcursos.com.br")
                                                        .videoUrl("")
                                                        .pdfUrl("#")
                                                        .build());

                        dailyGoalRepository.saveAll(metasIniciais);
                        System.out.println("✅ Banco 'papyrus' sincronizado com sucesso!");
                }
        }
}