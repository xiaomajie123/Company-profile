package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Milestone;
import com.vectorcat.service.MilestoneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/milestones")
@RequiredArgsConstructor
@Tag(name = "Admin - 里程碑管理")
public class AdminMilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping
    @Operation(summary = "获取所有里程碑")
    public Result<List<Milestone>> listAll() {
        return Result.success(milestoneService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建里程碑")
    public Result<Milestone> create(@RequestBody Milestone milestone) {
        return Result.success(milestoneService.create(milestone));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新里程碑")
    public Result<Milestone> update(@PathVariable Long id, @RequestBody Milestone milestone) {
        return Result.success(milestoneService.update(id, milestone));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除里程碑")
    public Result<String> delete(@PathVariable Long id) {
        milestoneService.delete(id);
        return Result.success("操作成功");
    }
}
