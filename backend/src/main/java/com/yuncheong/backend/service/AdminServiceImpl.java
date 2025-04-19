package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.AdminDTO.*;
import com.yuncheong.backend.entity.AdminEntity;
import com.yuncheong.backend.repository.AdminRepository;
import com.yuncheong.backend.security.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

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
                .orElseThrow(() -> new BadCredentialsException("이메일 또는 비밀번호가 잘못되었습니다"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new BadCredentialsException("이메일 또는 비밀번호가 잘못되었습니다");
        }

        admin.updateLastLogin();

        String accessToken = jwtTokenProvider.generateToken(admin.getId(), request.isRememberMe());
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(admin.getId());
        admin.setRefreshToken(newRefreshToken);

        return LoginResponse.builder()
                .adminId(admin.getId())
                .email(admin.getEmail())
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    @Override
    @Transactional
    public void logout(String accessToken) {
        Long adminId = jwtTokenProvider.getAdminIdFromToken(accessToken);
        adminRepository.findById(adminId).ifPresent(admin -> {
            admin.setRefreshToken(null);
        });
    }

    @Override
    @Transactional
    public void changePassword(Long adminId, PasswordChangeRequest request) {
        AdminEntity admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new BadCredentialsException("사용자를 찾을 수 없습니다"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            throw new BadCredentialsException("현재 비밀번호가 일치하지 않습니다");
        }

        admin.changePassword(passwordEncoder.encode(request.getNewPassword()));
    }

    @Override
    @Transactional
    public LoginResponse refreshAccessToken(RefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        // 토큰 유효성 검사
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new BadCredentialsException("유효하지 않은 리프레시 토큰");
        }

        Long adminId = jwtTokenProvider.getAdminIdFromToken(refreshToken);
        AdminEntity admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new BadCredentialsException("사용자를 찾을 수 없습니다"));

        // 저장된 토큰과 비교
        if (!refreshToken.equals(admin.getRefreshToken())) {
            throw new BadCredentialsException("리프레시 토큰 불일치");
        }

        // 새 토큰 생성
        String newAccessToken = jwtTokenProvider.generateToken(admin.getId(), false);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(admin.getId());

        // 새 리프레시 토큰 저장
        admin.setRefreshToken(newRefreshToken);

        return LoginResponse.builder()
                .adminId(admin.getId())
                .email(admin.getEmail())
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}