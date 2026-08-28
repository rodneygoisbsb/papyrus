package com.papiro.backend.services;

import com.papiro.backend.dtos.DisciplineDTO;
import com.papiro.backend.dtos.DisciplineDTO.SaveDisciplineRequest;
import com.papiro.backend.dtos.DisciplineDTO.TopicDTO;
import com.papiro.backend.models.Subject;
import com.papiro.backend.models.StudyPlan;
import com.papiro.backend.models.Topic;
import com.papiro.backend.repositories.SubjectRepository;
import com.papiro.backend.repositories.StudyPlanRepository;
import com.papiro.backend.repositories.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DisciplineService {

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;
    private final StudyPlanRepository studyPlanRepository;

    @Transactional(readOnly = true)
    public List<DisciplineDTO> getDisciplinesByPlan(String planId) {
        List<Subject> subjects = subjectRepository.findByPlanId(planId);

        return subjects.stream().map(subject -> {
            List<Topic> topics = topicRepository.findBySubjectId(subject.getId());

            int studied = (int) topics.stream().filter(Topic::isTheoryCompleted).count();
            int questions = topics.stream()
                    .mapToInt(t -> t.getQuestionsTotal() != null ? t.getQuestionsTotal() : 0)
                    .sum();

            List<TopicDTO> topicDTOs = topics.stream()
                    .map(t -> new TopicDTO(t.getId(), t.getName(), t.isTheoryCompleted()))
                    .toList();

            return new DisciplineDTO(
                    subject.getId(),
                    subject.getPlanId(),
                    subject.getName(),
                    subject.getColorHex() != null ? subject.getColorHex() : "#2563EB",
                    studied,
                    topics.size(),
                    questions,
                    topicDTOs);
        }).toList();
    }

    @Transactional
    public DisciplineDTO createDiscipline(String planId, SaveDisciplineRequest request) {
        StudyPlan studyPlan = studyPlanRepository.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Plano de estudos não encontrado: " + planId));

        Subject subject = Subject.builder()
                .studyPlan(studyPlan)
                .name(request.name())
                .colorHex(request.colorHex() != null ? request.colorHex() : "#2563EB")
                .build();

        Subject savedSubject = subjectRepository.save(subject);
        List<TopicDTO> createdTopics = new ArrayList<>();

        if (request.topics() != null) {
            for (TopicDTO t : request.topics()) {
                Topic topic = Topic.builder()
                        .id("t_" + UUID.randomUUID().toString().substring(0, 8))
                        .name(t.name())
                        .subject(savedSubject)
                        .theoryCompleted(false)
                        .questionsTotal(0)
                        .questionsCorrect(0)
                        .build();
                Topic savedTopic = topicRepository.save(topic);
                createdTopics.add(new TopicDTO(savedTopic.getId(), savedTopic.getName(), false));
            }
        }

        return new DisciplineDTO(
                savedSubject.getId(),
                savedSubject.getPlanId(),
                savedSubject.getName(),
                savedSubject.getColorHex(),
                0,
                createdTopics.size(),
                0,
                createdTopics);
    }

    @Transactional
    public DisciplineDTO updateDiscipline(Long disciplineId, SaveDisciplineRequest request) {
        Subject subject = subjectRepository.findById(disciplineId)
                .orElseThrow(() -> new IllegalArgumentException("Disciplina não encontrada com ID: " + disciplineId));

        subject.setName(request.name());
        if (request.colorHex() != null) {
            subject.setColorHex(request.colorHex());
        }
        subjectRepository.save(subject);

        // Limpa os tópicos antigos e recria com os novos dados enviados
        topicRepository.deleteBySubjectId(disciplineId);

        List<TopicDTO> updatedTopics = new ArrayList<>();
        if (request.topics() != null) {
            for (TopicDTO t : request.topics()) {
                Topic topic = Topic.builder()
                        .id("t_" + UUID.randomUUID().toString().substring(0, 8))
                        .name(t.name())
                        .subject(subject)
                        .theoryCompleted(t.theoryCompleted())
                        .questionsTotal(0)
                        .questionsCorrect(0)
                        .build();
                Topic saved = topicRepository.save(topic);
                updatedTopics.add(new TopicDTO(saved.getId(), saved.getName(), saved.isTheoryCompleted()));
            }
        }

        int studied = (int) updatedTopics.stream().filter(TopicDTO::theoryCompleted).count();

        return new DisciplineDTO(
                subject.getId(),
                subject.getPlanId(),
                subject.getName(),
                subject.getColorHex(),
                studied,
                updatedTopics.size(),
                0,
                updatedTopics);
    }

    @Transactional
    public void deleteDiscipline(Long disciplineId) {
        topicRepository.deleteBySubjectId(disciplineId);
        subjectRepository.deleteById(disciplineId);
    }
}