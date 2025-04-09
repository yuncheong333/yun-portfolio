// PostService.java
package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.PostDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


public interface PostService {
    PostDTO.Response createPost(PostDTO.Request request);
    PostDTO.Response getPostById(Long id);
    List<PostDTO.Response> getAllPosts();  // 전체 목록 (비페이징)
    Page<PostDTO.Response> getPostsPage(Pageable pageable);  // 페이징 목록 (메서드명 변경)
    PostDTO.Response updatePost(Long id, PostDTO.Request request);
    void deletePost(Long id);
}