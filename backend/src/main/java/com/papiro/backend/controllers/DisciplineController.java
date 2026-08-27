package com.papiro.backend.controllers;

import com.papiro.backend.dtos.DisciplineDTO;
import com.papiro.backend.dtos.DisciplineDTO.SaveDisciplineRequest;
import com.papiro.backend.services.DisciplineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DisciplineController {

        private final DisciplineService disciplineService;

        @GetMapping("/plans/{planId}/disciplines")
        public ResponseEntity<List<DisciplineDTO>> getDisciplinesByPlan(@PathVariable Long planId) {
                return ResponseEntity.ok(disciplineService.getDisciplinesByPlan(planId));
        }

        @PostMapping("/plans/{planId}/disciplines")
        public ResponseEntity<DisciplineDTO> createDiscipline(
                        @PathVariable Long planId,
                        @RequestBody SaveDisciplineRequest request) {
                return ResponseEntity.ok(disciplineService.createDiscipline(planId, request));
        }

        @PutMapping("/disciplines/{id}")
        public ResponseEntity<DisciplineDTO> updateDiscipline(
                        @PathVariable Long id,
                        @RequestBody SaveDisciplineRequest request) {
                return ResponseEntity.ok(disciplineService.updateDiscipline(id, request));
        }

        @DeleteMapping("/disciplines/{id}")
        public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
                disciplineService.deleteDiscipline(id);
                return ResponseEntity.noContent().build();
        }
}