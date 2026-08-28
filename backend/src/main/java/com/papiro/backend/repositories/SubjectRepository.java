package com.papiro.backend.repositories;

import com.papiro.backend.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {

    // Consulta JPQL segura que busca matérias pelo ID textual do StudyPlan (String)
    @Query("SELECT s FROM Subject s WHERE s.studyPlan.id = :planId")
    List<Subject> findByPlanId(@Param("planId") String planId);
}