package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Advantage;
import com.vectorcat.service.AdvantageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/advantages")
@RequiredArgsConstructor
@Tag(name = "优势特色", description = "优势特色相关接口")
public class AdvantageController {

    private final AdvantageService advantageService;

    @GetMapping
    @Operation(summary = "获取所有启用的优势")
    public Result<List<Advantage>> getAdvantages() {
        return Result.success(advantageService.getActiveAdvantages());
    }
}
