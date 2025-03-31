package com.yuncheong.backend.controller;

import com.yuncheong.backend.dto.AdminDTO.*;
import com.yuncheong.backend.entity.AdminEntity;
import com.yuncheong.backend.repository.AdminRepository;
import com.yuncheong.backend.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return ResponseEntity.ok(adminService.authenticate(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        adminService.logout(token);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @RequestHeader("X-Admin-Id") Long adminId,
            @RequestBody PasswordChangeRequest request) {
        adminService.changePassword(adminId, request);
        return ResponseEntity.ok().build();
    }

    // 회원가입 처리
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/register")
    public String signup(@RequestBody AdminEntity admin) {
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(admin.getPassword());

        // 비밀번호를 암호화된 값으로 변경
        admin.changePassword(encodedPassword);

        // 생성일 설정


        // DB에 저장
        adminRepository.save(admin);

        return "회원가입 완료!";
    }
}