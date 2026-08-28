package com.papiro.backend.controllers;

import com.papiro.backend.models.StudyPlan;
import com.papiro.backend.repositories.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudyPlanController {

    private final StudyPlanRepository studyPlanRepository;

    // DTO Record imutável
    public record StudyPlanResponse(String id, String name) {
        public static StudyPlanResponse fromEntity(StudyPlan plan) {
            return new StudyPlanResponse(plan.getId(), plan.getName());
        }
    }

    @GetMapping
    public ResponseEntity<List<StudyPlanResponse>> getAllPlans() {
        List<StudyPlanResponse> plans = studyPlanRepository.findAll()
                .stream()
                .map(StudyPlanResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(plans);
    }
}