package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "study_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPlan {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;
}