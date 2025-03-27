package com.yuncheong.backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/example")
    public Map<String, String> getExampleData() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "React와 Spring Boot 연동 완료!");
        return response;
    }
}