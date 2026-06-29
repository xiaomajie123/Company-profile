package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.LearningPath;
import com.vectorcat.service.LearningPathService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/learning-paths")
@RequiredArgsConstructor
@Tag(name = "学习路径", description = "学习路径相关接口")
public class LearningPathController {

    private final LearningPathService learningPathService;

    @GetMapping
    @Operation(summary = "获取所有启用的学习路径")
    public Result<List<LearningPath>> getLearningPaths() {
        return Result.success(learningPathService.getActivePaths());
    }
}
