package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.AdminDTO.*;

public interface AdminService {
    LoginResponse authenticate(LoginRequest request);
    void logout(String accessToken);
    void changePassword(Long adminId, PasswordChangeRequest request);
    LoginResponse refreshAccessToken(RefreshRequest request);
}