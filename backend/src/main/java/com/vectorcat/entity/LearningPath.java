package com.vectorcat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("learning_path")
public class LearningPath {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Integer stepNumber;
    private String title;
    private String ageRange;
    private String icon;
    private Integer sortOrder;
    private Integer isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
