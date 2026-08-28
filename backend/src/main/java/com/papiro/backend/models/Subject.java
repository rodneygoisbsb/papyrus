package com.papiro.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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

    // Relacionamento JPA obrigatório com o StudyPlan pai
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private StudyPlan studyPlan;

    @Column(nullable = false)
    private String name;

    @Builder.Default
    @Column(name = "color_hex")
    private String colorHex = "#2563EB";

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics;

    // Método ponte auxiliar seguro para retornar o ID do plano como String/Long
    // onde necessário
    public String getPlanId() {
        return studyPlan != null ? studyPlan.getId() : null;
    }
}