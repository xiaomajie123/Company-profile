package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Milestone;
import com.vectorcat.service.MilestoneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
@Tag(name = "发展历程", description = "发展历程相关接口")
public class MilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping
    @Operation(summary = "获取所有启用的大事件")
    public Result<List<Milestone>> getMilestones() {
        return Result.success(milestoneService.getActiveMilestones());
    }
}
