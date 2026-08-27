package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_topics")
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

    @Builder.Default
    private boolean theoryCompleted = false;

    @Builder.Default
    private Integer questionsTotal = 0;

    @Builder.Default
    private Integer questionsCorrect = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;
}