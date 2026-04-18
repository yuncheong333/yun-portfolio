package com.yuncheong.backend.service;


import com.yuncheong.backend.dto.UserDTO;

public interface UserService {
    UserDTO.LoginResponse authenticate(UserDTO.LoginRequest request);
    UserDTO.RegisterResponse register(UserDTO.RegisterRequest request);
    boolean existsById(Long id);
    boolean existsByNickname(String nickname);
}
