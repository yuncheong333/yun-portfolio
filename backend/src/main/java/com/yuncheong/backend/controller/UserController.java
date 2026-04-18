package com.yuncheong.backend.controller;

import com.yuncheong.backend.dto.AdminDTO;
import com.yuncheong.backend.dto.UserDTO;
import com.yuncheong.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO.LoginResponse> login(@RequestBody UserDTO.LoginRequest request) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO.RegisterResponse> Register(@RequestBody UserDTO.RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/search/id/{id}")
    public ResponseEntity<UserDTO.CheckResponse> checkUserId(@PathVariable Long id) {
        boolean exists = userService.existsById(id);
        return ResponseEntity.ok(UserDTO.CheckResponse.builder().exists(exists).build());
    }

    @GetMapping("/search/nickname/{nickname}")
    public ResponseEntity<UserDTO.CheckResponse> checkUserNickname(@PathVariable String nickname) {
        boolean exists = userService.existsByNickname(nickname);
        return ResponseEntity.ok(UserDTO.CheckResponse.builder().exists(exists).build());
    }
}
