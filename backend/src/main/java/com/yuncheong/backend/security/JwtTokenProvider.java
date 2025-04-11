package com.yuncheong.backend.security;

import com.yuncheong.backend.exception.JwtAuthenticationException;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
@Log4j2
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}") // in milliseconds
    private long defaultExpiration;

    @Value("${jwt.remember-me-expiration}") // in milliseconds
    private long rememberMeExpiration;

    @Value("${jwt.refresh-expiration}") // in milliseconds
    private long refreshExpiration;

    public String generateToken(Long adminId, boolean rememberMe) {
        long expiration = rememberMe ? rememberMeExpiration : defaultExpiration;
        return Jwts.builder()
                .setSubject(adminId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public String generateRefreshToken(Long adminId) {
        return Jwts.builder()
                .setSubject(adminId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpiration))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException ex) {
            log.error("Token expired", ex);
            throw new JwtAuthenticationException("토큰이 만료되었습니다");
        } catch (MalformedJwtException ex) {
            log.error("Invalid token", ex);
            throw new JwtAuthenticationException("유효하지 않은 토큰입니다");
        } catch (Exception ex) {
            log.error("Token validation failed", ex);
            throw new JwtAuthenticationException("토큰 검증에 실패했습니다");
        }
    }

    public Long getAdminIdFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            return Long.parseLong(claims.getSubject());
        } catch (Exception ex) {
            log.error("Token parsing failed", ex);
            throw new JwtAuthenticationException("토큰에서 사용자 정보를 추출할 수 없습니다");
        }
    }
}