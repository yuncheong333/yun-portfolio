package com.yuncheong.backend.controller;

import com.yuncheong.backend.dto.PostDTO;
import com.yuncheong.backend.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 기존 메서드들 유지 (생성, 조회, 수정, 삭제)
    @PostMapping
    public ResponseEntity<PostDTO.Response> createPost(@RequestBody PostDTO.Request request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO.Response> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    // [변경] 기존 목록 조회 (비페이징)
    @GetMapping
    public ResponseEntity<List<PostDTO.Response>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // [추가] 페이징 조회 (새 엔드포인트)
    @GetMapping("/page")
    public ResponseEntity<Page<PostDTO.Response>> getPostsPage(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postService.getPostsPage(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO.Response> updatePost(
            @PathVariable Long id, @RequestBody PostDTO.Request request) {
        return ResponseEntity.ok(postService.updatePost(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}