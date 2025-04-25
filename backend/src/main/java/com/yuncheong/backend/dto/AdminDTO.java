package com.yuncheong.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class AdminDTO {

    @Getter @Setter
    @NoArgsConstructor
    public static class LoginRequest {
        @NotBlank @Email
        private String email;

        @NotBlank
        private String password;

        private boolean rememberMe;
    }

    @Getter @Setter
    public static class RefreshRequest {
        @NotBlank
        private String refreshToken;
    }

    @Getter @Builder
    public static class LoginResponse {
        private Long adminId;
        private String email;
        private String accessToken;
        private String refreshToken;
    }

    @Getter @Setter
    public static class PasswordChangeRequest {
        @NotBlank
        private String currentPassword;

        @NotBlank
        private String newPassword;
    }
}
