package com.papiro.backend.repositories;

import com.papiro.backend.models.DailyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyGoalRepository extends JpaRepository<DailyGoal, Long> {

    List<DailyGoal> findByPlanIdAndTargetDate(Long planId, LocalDate targetDate);

    List<DailyGoal> findByPlanId(Long planId);
}