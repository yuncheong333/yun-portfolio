package com.yuncheong.backend.security;
import com.yuncheong.backend.exception.JwtAuthenticationException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 인증이 필요 없는 경로는 필터 건너뜀
        if ("/api/admin/refresh".equals(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = resolveToken(request);

            if (token == null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증 토큰이 없습니다");
                return;
            }

            if (jwtTokenProvider.validateToken(token)) {
                Long adminId = jwtTokenProvider.getAdminIdFromToken(token);
                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(adminId, null, Collections.emptyList())
                );
            }

            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException ex) {
            // 프론트엔드에서 리프레시를 시도할 수 있도록 440 상태 코드 사용
            response.setHeader("Token-Expired", "true");
            response.sendError(440, "Access token expired");
        } catch (JwtAuthenticationException ex) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
        }
    }




    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}