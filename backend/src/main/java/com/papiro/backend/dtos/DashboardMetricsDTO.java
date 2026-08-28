package com.papiro.backend.dtos;

public record DashboardMetricsDTO(
        int studiedTopics,
        int totalTopics,
        int questionsDone,
        double successRate) {
}