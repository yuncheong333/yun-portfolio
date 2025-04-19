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
            // 만료된 토큰도 정보 추출을 위해 true 반환
            return true;
        } catch (Exception ex) {
            log.error("Token validation failed", ex);
            return false;
        }
    }

    public Long getAdminIdFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
            return Long.parseLong(claims.getSubject());
        } catch (ExpiredJwtException ex) {
            // 만료된 토큰에서도 정보 추출
            return Long.parseLong(ex.getClaims().getSubject());
        } catch (Exception ex) {
            log.error("Token parsing failed", ex);
            throw new JwtAuthenticationException("토큰에서 사용자 정보를 추출할 수 없습니다");
        }
    }
}