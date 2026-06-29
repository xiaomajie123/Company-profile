package com.vectorcat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("company_info")
public class CompanyInfo {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String infoType;
    private String title;
    private String icon;
    private String content;
    private String description;
    private Integer paragraphOrder;
    private Integer sortOrder;
    private Integer isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
