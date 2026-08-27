package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_id", nullable = false)
    private Long planId;

    @Column(nullable = false)
    private String name;

    @Builder.Default
    @Column(name = "color_hex")
    private String colorHex = "#2563EB";
}