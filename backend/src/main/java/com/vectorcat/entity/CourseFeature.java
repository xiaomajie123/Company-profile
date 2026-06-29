package com.vectorcat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("course_feature")
public class CourseFeature {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long courseId;
    private String content;
    private Integer sortOrder;
    private LocalDateTime createdAt;
}
