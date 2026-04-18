package com.yuncheong.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

public class PostDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        private String title;
        private String content;
        private Integer author;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private Integer author;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
