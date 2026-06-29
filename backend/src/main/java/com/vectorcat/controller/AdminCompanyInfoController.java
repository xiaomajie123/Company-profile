package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.CompanyInfo;
import com.vectorcat.service.CompanyInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/company-info")
@RequiredArgsConstructor
@Tag(name = "Admin - 公司信息管理")
public class AdminCompanyInfoController {

    private final CompanyInfoService companyInfoService;

    @GetMapping
    @Operation(summary = "获取所有公司信息")
    public Result<List<CompanyInfo>> listAll() {
        return Result.success(companyInfoService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建公司信息")
    public Result<CompanyInfo> create(@RequestBody CompanyInfo companyInfo) {
        return Result.success(companyInfoService.create(companyInfo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新公司信息")
    public Result<CompanyInfo> update(@PathVariable Long id, @RequestBody CompanyInfo companyInfo) {
        return Result.success(companyInfoService.update(id, companyInfo));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除公司信息")
    public Result<String> delete(@PathVariable Long id) {
        companyInfoService.delete(id);
        return Result.success("操作成功");
    }
}
