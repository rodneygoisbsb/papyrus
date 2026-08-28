package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_topic")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Builder.Default
    @Column(name = "theory_completed")
    private boolean theoryCompleted = false;

    @Builder.Default
    @Column(name = "questions_total")
    private Integer questionsTotal = 0;

    @Builder.Default
    @Column(name = "questions_correct")
    private Integer questionsCorrect = 0;
}