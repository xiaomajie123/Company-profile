package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Advantage;
import com.vectorcat.service.AdvantageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/advantages")
@RequiredArgsConstructor
@Tag(name = "Admin - 优势管理")
public class AdminAdvantageController {

    private final AdvantageService advantageService;

    @GetMapping
    @Operation(summary = "获取所有优势")
    public Result<List<Advantage>> listAll() {
        return Result.success(advantageService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建优势")
    public Result<Advantage> create(@RequestBody Advantage advantage) {
        return Result.success(advantageService.create(advantage));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新优势")
    public Result<Advantage> update(@PathVariable Long id, @RequestBody Advantage advantage) {
        return Result.success(advantageService.update(id, advantage));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除优势")
    public Result<String> delete(@PathVariable Long id) {
        advantageService.delete(id);
        return Result.success("操作成功");
    }
}
