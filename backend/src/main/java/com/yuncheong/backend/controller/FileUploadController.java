package com.yuncheong.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir).resolve(fileName);
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);

            // 이미지 접근 URL
            String fileUrl = "/uploads/" + fileName;

            Map<String, String> result = new HashMap<>();
            result.put("url", fileUrl);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
