// PostRepository.java
package com.yuncheong.backend.repository;

import com.yuncheong.backend.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findAll(Sort sort);
    Page<PostEntity> findAll(Pageable pageable);
}