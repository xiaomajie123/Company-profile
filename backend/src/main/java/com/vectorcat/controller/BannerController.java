package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Banner;
import com.vectorcat.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@RequiredArgsConstructor
@Tag(name = "轮播图", description = "轮播图相关接口")
public class BannerController {

    private final BannerService bannerService;

    @GetMapping
    @Operation(summary = "获取所有启用的轮播图")
    public Result<List<Banner>> getBanners() {
        return Result.success(bannerService.getActiveBanners());
    }
}
