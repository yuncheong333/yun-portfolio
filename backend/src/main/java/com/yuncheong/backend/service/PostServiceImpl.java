// PostServiceImpl.java
package com.yuncheong.backend.service;

import com.yuncheong.backend.dto.PostDTO;
import com.yuncheong.backend.entity.PostEntity;
import com.yuncheong.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    @Transactional
    public PostDTO.Response createPost(PostDTO.Request request) {
        PostEntity entity = PostEntity.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(request.getAuthor())
                .build();

        PostEntity saved = postRepository.save(entity);
        return toResponseDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PostDTO.Response getPostById(Long id) {
        return postRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PostDTO.Response> getAllPosts() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PostDTO.Response updatePost(Long id, PostDTO.Request request) {
        PostEntity entity = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        entity.update(request.getTitle(), request.getContent(), request.getAuthor());
        PostEntity updated = postRepository.save(entity);
        return toResponseDTO(updated);
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        PostEntity entity = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        postRepository.delete(entity);
    }

    private PostDTO.Response toResponseDTO(PostEntity entity) {
        return PostDTO.Response.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .author(entity.getAuthor())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
    @Override
    @Transactional(readOnly = true)
    public Page<PostDTO.Response> getPostsPage(Pageable pageable) {
        return postRepository.findAll(pageable)
                .map(this::toResponseDTO);
    }
}