package com.yuncheong.backend.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long defaultExpiration;

    @Value("${jwt.remember-me-expiration}")
    private long rememberMeExpiration;

    public String generateToken(Long adminId, boolean rememberMe) {
        long expiration = rememberMe ? rememberMeExpiration : defaultExpiration;
        return Jwts.builder()
                .setSubject(adminId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public void invalidateToken(String token) {
        // 토큰 블랙리스트 처리 구현
    }
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);

            // ✅ 토큰 만료 시간 검증
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Long getAdminIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }
}