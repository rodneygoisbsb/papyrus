package com.papiro.backend.controllers;

import com.papiro.backend.dtos.DashboardHomeResponseDTO;
import com.papiro.backend.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/home")
    public ResponseEntity<DashboardHomeResponseDTO> getDashboardHome(
            @RequestParam(required = false) Long planoId) {
        DashboardHomeResponseDTO response = dashboardService.obterResumoAbaInicio(planoId);
        return ResponseEntity.ok(response);
    }
}