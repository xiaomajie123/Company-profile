package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.CompanyInfo;
import com.vectorcat.service.CompanyInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/company-info")
@RequiredArgsConstructor
@Tag(name = "公司信息", description = "公司信息相关接口")
public class CompanyInfoController {

    private final CompanyInfoService companyInfoService;

    @GetMapping
    @Operation(summary = "获取所有公司信息（包含故事和价值观）")
    public Result<Map<String, Object>> getAllInfo() {
        return Result.success(companyInfoService.getAllInfo());
    }

    @GetMapping("/story")
    @Operation(summary = "获取公司故事")
    public Result<List<CompanyInfo>> getStory() {
        return Result.success(companyInfoService.getStory());
    }

    @GetMapping("/values")
    @Operation(summary = "获取公司价值观")
    public Result<List<CompanyInfo>> getValues() {
        return Result.success(companyInfoService.getValues());
    }
}
