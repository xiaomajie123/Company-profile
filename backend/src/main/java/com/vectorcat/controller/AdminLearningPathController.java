package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.LearningPath;
import com.vectorcat.service.LearningPathService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/learning-paths")
@RequiredArgsConstructor
@Tag(name = "Admin - 学习路径管理")
public class AdminLearningPathController {

    private final LearningPathService learningPathService;

    @GetMapping
    @Operation(summary = "获取所有学习路径")
    public Result<List<LearningPath>> listAll() {
        return Result.success(learningPathService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建学习路径")
    public Result<LearningPath> create(@RequestBody LearningPath learningPath) {
        return Result.success(learningPathService.create(learningPath));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新学习路径")
    public Result<LearningPath> update(@PathVariable Long id, @RequestBody LearningPath learningPath) {
        return Result.success(learningPathService.update(id, learningPath));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除学习路径")
    public Result<String> delete(@PathVariable Long id) {
        learningPathService.delete(id);
        return Result.success("操作成功");
    }
}
