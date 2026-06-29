package com.vectorcat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("contact_submission")
public class ContactSubmission {

    @TableId(type = IdType.AUTO)
    private Long id;

    @NotBlank(message = "姓名不能为空")
    private String parentName;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "1[3-9]\\d{9}", message = "手机号格式不正确")
    private String phone;

    @NotBlank(message = "孩子年龄不能为空")
    private String childAge;

    private String message;
    private String status;
    private String remark;
    private String ipAddress;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
