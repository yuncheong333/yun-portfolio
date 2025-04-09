package com.yuncheong.backend.mapper;

import com.yuncheong.backend.dto.PostDTO;
import com.yuncheong.backend.entity.PostEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostEntity toEntity(PostDTO.Request request);
    PostDTO.Response toResponse(PostEntity entity);
}