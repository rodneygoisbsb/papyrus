package com.papiro.backend.services;

import com.papiro.backend.dtos.DashboardMetricsDTO;
import com.papiro.backend.models.StudyPlan;
import com.papiro.backend.repositories.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyPlanService {

    private final StudyPlanRepository studyPlanRepository;

    @Transactional(readOnly = true)
    public List<StudyPlan> getAllPlans() {
        return studyPlanRepository.findAll();
    }

    @Transactional(readOnly = true)
    public DashboardMetricsDTO getMetrics(String planId) {
        // Retorno base seguro para alimentar os cards do Dashboard
        return new DashboardMetricsDTO(0, 0, 0, 0.0);
    }
}