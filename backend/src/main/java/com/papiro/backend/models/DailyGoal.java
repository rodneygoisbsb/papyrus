package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tb_daily_goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Column(name = "plan_id")
    private Long planId;

    @Column(length = 60)
    private String subject;

    @Column(name = "subject_color", length = 20)
    private String subjectColor;

    @Column(name = "topic_name", length = 150)
    private String topicName;

    @Column(length = 50)
    private String importance;

    @Column(length = 30)
    private String type; // THEORY, QUESTIONS, REVISION, LEI_SECA

    @Column(name = "revision_tag", length = 30)
    private String revisionTag;

    @Column(name = "duration_minutes")
    @Builder.Default
    private int durationMinutes = 0;

    @Column(name = "target_duration_minutes")
    @Builder.Default
    private int targetDurationMinutes = 0;

    @Column(name = "actual_duration_minutes")
    @Builder.Default
    private int actualDurationMinutes = 0;

    @Column(name = "questions_total")
    @Builder.Default
    private int questionsTotal = 0;

    @Column(name = "questions_correct")
    @Builder.Default
    private int questionsCorrect = 0;

    @Column(name = "study_method", length = 100)
    private String studyMethod;

    @Column(nullable = false)
    @Builder.Default
    private boolean completed = false;

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;

    @Column(name = "target_date")
    private LocalDate targetDate;

    @Column(name = "tec_url", length = 255)
    private String tecUrl;

    @Column(name = "video_url", length = 255)
    private String videoUrl;

    @Column(name = "pdf_url", length = 255)
    private String pdfUrl;

    @Column(name = "error_notes", columnDefinition = "TEXT")
    private String errorNotes;

    @Column(name = "summary_notes", columnDefinition = "TEXT")
    private String summaryNotes;
}