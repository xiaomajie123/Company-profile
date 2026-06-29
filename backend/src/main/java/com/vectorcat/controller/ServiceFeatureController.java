package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.ServiceFeature;
import com.vectorcat.service.ServiceFeatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/service-features")
@RequiredArgsConstructor
@Tag(name = "服务特色", description = "服务特色相关接口")
public class ServiceFeatureController {

    private final ServiceFeatureService serviceFeatureService;

    @GetMapping
    @Operation(summary = "获取所有启用的服务特色")
    public Result<List<ServiceFeature>> getServiceFeatures() {
        return Result.success(serviceFeatureService.getActiveFeatures());
    }
}
