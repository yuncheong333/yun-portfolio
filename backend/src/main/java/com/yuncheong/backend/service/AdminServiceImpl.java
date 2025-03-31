package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.AdminDTO.*;
import com.yuncheong.backend.entity.AdminEntity;
import com.yuncheong.backend.repository.AdminRepository;
import com.yuncheong.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;  // 여기에서 임포트
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public LoginResponse authenticate(LoginRequest request) {
        AdminEntity admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        admin.updateLastLogin();

        String accessToken = jwtTokenProvider.generateToken(admin.getId(), request.isRememberMe());

        return LoginResponse.builder()
                .adminId(admin.getId())
                .email(admin.getEmail())
                .accessToken(accessToken)
                .build();
    }

    @Override
    public void logout(String accessToken) {
        jwtTokenProvider.invalidateToken(accessToken);
    }

    @Override
    @Transactional
    public void changePassword(Long adminId, PasswordChangeRequest request) {
        AdminEntity admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        admin.changePassword(passwordEncoder.encode(request.getNewPassword()));
    }

}
