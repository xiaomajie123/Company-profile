package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.SiteConfig;
import com.vectorcat.service.SiteConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/site-config")
@RequiredArgsConstructor
@Tag(name = "Admin - 站点配置管理")
public class AdminSiteConfigController {

    private final SiteConfigService siteConfigService;

    @GetMapping
    @Operation(summary = "获取所有站点配置")
    public Result<List<SiteConfig>> listAll() {
        return Result.success(siteConfigService.listAll());
    }

    @PutMapping("/{key}")
    @Operation(summary = "更新单个配置")
    public Result<String> updateConfig(@PathVariable String key, @RequestBody Map<String, String> body) {
        String value = body.get("configValue");
        siteConfigService.updateConfig(key, value);
        return Result.success("操作成功");
    }

    @PostMapping("/batch")
    @Operation(summary = "批量更新配置")
    public Result<String> batchUpdate(@RequestBody List<Map<String, String>> configs) {
        for (Map<String, String> config : configs) {
            String key = config.get("configKey");
            String value = config.get("configValue");
            siteConfigService.updateConfig(key, value);
        }
        return Result.success("操作成功");
    }
}
