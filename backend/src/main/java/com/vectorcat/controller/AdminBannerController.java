package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Banner;
import com.vectorcat.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/banners")
@RequiredArgsConstructor
@Tag(name = "Admin - Banner管理")
public class AdminBannerController {

    private final BannerService bannerService;

    @GetMapping
    @Operation(summary = "获取所有Banner")
    public Result<List<Banner>> listAll() {
        return Result.success(bannerService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建Banner")
    public Result<Banner> create(@RequestBody Banner banner) {
        return Result.success(bannerService.create(banner));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新Banner")
    public Result<Banner> update(@PathVariable Long id, @RequestBody Banner banner) {
        return Result.success(bannerService.update(id, banner));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除Banner")
    public Result<String> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return Result.success("操作成功");
    }
}
