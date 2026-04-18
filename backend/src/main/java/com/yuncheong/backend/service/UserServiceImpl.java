package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.UserDTO;
import com.yuncheong.backend.entity.UserEntity;
import com.yuncheong.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    public UserDTO.LoginResponse authenticate(UserDTO.LoginRequest request) {
        UserEntity user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("이메일 또는 비밀번호가 잘못되었습니다"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("이메일 또는 비밀번호가 잘못되었습니다");
        }

        user.updateLastLogin();
        return UserDTO.LoginResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .build();
    }

    public UserDTO.RegisterResponse register(UserDTO.RegisterRequest request) {
        // username 중복 검사
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // 유저 저장
        UserEntity user = UserEntity.builder()
                .username(request.getUsername())
                .password(encodedPassword)
                .build();

        UserEntity savedUser = userRepository.save(user);

        return UserDTO.RegisterResponse.builder()
                .userId(savedUser.getId())
                .username(savedUser.getUsername())
                .build();
    }
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
