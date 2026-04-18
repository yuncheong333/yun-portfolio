package com.yuncheong.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

public class UserDTO {

    @Getter @Setter
    @NoArgsConstructor
    public static class LoginRequest {
        @NotBlank
        @Email
        private String username;

        @NotBlank
        private String password;

        private boolean rememberMe;
    }

    @Getter @Builder
    public static class LoginResponse {
        private Long userId;
        private String username;
        private String nickname;
    }

    @Getter @Setter
    public static class PasswordChangeRequest {
        @NotBlank
        private String currentPassword;

        @NotBlank
        private String newPassword;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RegisterRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String nickname;
        @NotBlank
        private String password;
    }

    @Getter
    @Builder
    public static class RegisterResponse {
        private Long userId;
        private String username;
    }

    @Getter
    @Builder
    public static class CheckResponse {
        private boolean exists;
    }
}
