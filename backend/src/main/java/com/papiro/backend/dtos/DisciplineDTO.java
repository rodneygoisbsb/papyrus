package com.papiro.backend.dtos;

import java.util.List;

public record DisciplineDTO(
                Long id,
                String planId,
                String name,
                String colorHex,
                int studiedTopics,
                int totalTopics,
                int questionsDone,
                List<TopicDTO> topics) {
        public record TopicDTO(
                        String id,
                        String name,
                        boolean theoryCompleted) {
        }

        public record SaveDisciplineRequest(
                        String name,
                        String colorHex,
                        List<TopicDTO> topics) {
        }
}