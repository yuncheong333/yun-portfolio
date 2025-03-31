package com.yuncheong.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        // 401 Unauthorized 응답 처리
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        String errorResponse = """
                {
                    "status": 401,
                    "error": "UNAUTHORIZED",
                    "message": "인증에 실패했습니다. 유효한 토큰이 필요합니다."
                }
                """;

        response.getWriter().write(errorResponse);
    }
}