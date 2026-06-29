package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.service.SiteConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/site-config")
@RequiredArgsConstructor
@Tag(name = "站点配置", description = "站点配置相关接口")
public class SiteConfigController {

    private final SiteConfigService siteConfigService;

    @GetMapping
    @Operation(summary = "获取所有配置")
    public Result<Map<String, String>> getAllConfig() {
        return Result.success(siteConfigService.getAllConfig());
    }

    @GetMapping("/{key}")
    @Operation(summary = "根据键获取配置值")
    public Result<String> getConfigValue(@PathVariable String key) {
        return Result.success(siteConfigService.getConfigValue(key));
    }
}
