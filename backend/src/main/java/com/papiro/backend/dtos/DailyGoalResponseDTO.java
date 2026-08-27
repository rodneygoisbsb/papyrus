package com.papiro.backend.dtos;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyGoalResponseDTO {
    private String id;
    private String topicId;
    private String subject;
    private String subjectColor;
    private String topicName;
    private String importance;
    private String type;
    private String revisionTag;
    private int durationMinutes;
    private int actualDurationMinutes;
    private int questionsTotal;
    private int questionsCorrect;
    private String studyMethod;
    private boolean completed;
    private String scheduledDate;
    private String targetDate;
    private String tecUrl;
    private String videoUrl;
    private String pdfUrl;
    private String errorNotes;
    private String summaryNotes;
}