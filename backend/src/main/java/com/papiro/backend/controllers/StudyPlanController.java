package com.papiro.backend.controllers;

import com.papiro.backend.models.StudyPlan;
import com.papiro.backend.repositories.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/plans")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudyPlanController {

    private final StudyPlanRepository studyPlanRepository;

    @GetMapping
    public ResponseEntity<List<StudyPlan>> getAllPlans() {
        return ResponseEntity.ok(studyPlanRepository.findAll());
    }
}