package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.ContactSubmission;
import com.vectorcat.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact-submissions")
@RequiredArgsConstructor
@Tag(name = "联系我们", description = "联系我们相关接口")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @Operation(summary = "提交联系表单")
    public Result<String> submit(@Valid @RequestBody ContactSubmission submission) {
        contactService.submit(submission);
        return Result.success("提交成功");
    }
}
