package com.papiro.backend.controllers;

import com.papiro.backend.dtos.DisciplineDTO;
import com.papiro.backend.dtos.DisciplineDTO.SaveDisciplineRequest;
import com.papiro.backend.services.DisciplineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplines")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DisciplineController {

        private final DisciplineService disciplineService;

        @GetMapping
        public ResponseEntity<List<DisciplineDTO>> getDisciplinesByPlan(@RequestParam String planId) {
                List<DisciplineDTO> disciplines = disciplineService.getDisciplinesByPlan(planId);
                return ResponseEntity.ok(disciplines);
        }

        @PostMapping
        public ResponseEntity<DisciplineDTO> createDiscipline(
                        @RequestParam String planId,
                        @RequestBody SaveDisciplineRequest request) {
                DisciplineDTO created = disciplineService.createDiscipline(planId, request);
                return ResponseEntity.ok(created);
        }

        @PutMapping("/{id}")
        public ResponseEntity<DisciplineDTO> updateDiscipline(
                        @PathVariable Long id,
                        @RequestBody SaveDisciplineRequest request) {
                DisciplineDTO updated = disciplineService.updateDiscipline(id, request);
                return ResponseEntity.ok(updated);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
                disciplineService.deleteDiscipline(id);
                return ResponseEntity.noContent().build();
        }
}