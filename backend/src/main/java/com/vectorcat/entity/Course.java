package com.vectorcat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@TableName("course")
public class Course {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;
    private String subtitle;
    private String description;
    private String ageRange;
    private Integer minAge;
    private Integer maxAge;
    private String icon;
    private String colorClass;
    private String borderColor;
    private String bgColor;
    private String duration;
    private Integer sortOrder;
    private Integer isActive;
    private Integer isShowHome;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @TableField(exist = false)
    private List<CourseFeature> features;

    @TableField(exist = false)
    private List<CourseLevel> levels;
}
