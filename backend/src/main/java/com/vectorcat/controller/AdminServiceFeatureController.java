package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.ServiceFeature;
import com.vectorcat.service.ServiceFeatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/service-features")
@RequiredArgsConstructor
@Tag(name = "Admin - 服务特色管理")
public class AdminServiceFeatureController {

    private final ServiceFeatureService serviceFeatureService;

    @GetMapping
    @Operation(summary = "获取所有服务特色")
    public Result<List<ServiceFeature>> listAll() {
        return Result.success(serviceFeatureService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建服务特色")
    public Result<ServiceFeature> create(@RequestBody ServiceFeature serviceFeature) {
        return Result.success(serviceFeatureService.create(serviceFeature));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新服务特色")
    public Result<ServiceFeature> update(@PathVariable Long id, @RequestBody ServiceFeature serviceFeature) {
        return Result.success(serviceFeatureService.update(id, serviceFeature));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除服务特色")
    public Result<String> delete(@PathVariable Long id) {
        serviceFeatureService.delete(id);
        return Result.success("操作成功");
    }
}
