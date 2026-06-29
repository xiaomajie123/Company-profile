package com.vectorcat.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.vectorcat.common.Result;
import com.vectorcat.entity.ContactSubmission;
import com.vectorcat.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/contact-submissions")
@RequiredArgsConstructor
@Tag(name = "Admin - 联系提交管理")
public class AdminContactController {

    private final ContactService contactService;

    @GetMapping
    @Operation(summary = "分页获取联系提交")
    public Result<IPage<ContactSubmission>> list(@RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "10") int size,
                                                  @RequestParam(required = false) String status) {
        if (status != null && !status.isBlank()) {
            return Result.success(contactService.getSubmissions(page, size, status));
        }
        return Result.success(contactService.getSubmissions(page, size));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "更新提交状态")
    public Result<String> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        contactService.updateStatus(id, status);
        return Result.success("操作成功");
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除提交记录")
    public Result<String> delete(@PathVariable Long id) {
        contactService.deleteSubmission(id);
        return Result.success("操作成功");
    }
}
