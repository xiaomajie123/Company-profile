package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.Course;
import com.vectorcat.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
@Tag(name = "Admin - 课程管理")
public class AdminCourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "获取所有课程（含未激活）")
    public Result<List<Course>> listAll() {
        return Result.success(courseService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建课程")
    public Result<Course> create(@RequestBody Course course) {
        return Result.success(courseService.create(course));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新课程")
    public Result<Course> update(@PathVariable Long id, @RequestBody Course course) {
        return Result.success(courseService.update(id, course));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除课程")
    public Result<String> delete(@PathVariable Long id) {
        courseService.delete(id);
        return Result.success("操作成功");
    }
}
