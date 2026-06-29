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
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "课程", description = "课程相关接口")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @Operation(summary = "获取所有课程")
    public Result<List<Course>> getAllCourses() {
        return Result.success(courseService.getAllCourses());
    }

    @GetMapping("/home")
    @Operation(summary = "获取首页展示课程")
    public Result<List<Course>> getHomeCourses() {
        return Result.success(courseService.getHomeCourses());
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取课程详情")
    public Result<Course> getCourseDetail(@PathVariable Long id) {
        return Result.success(courseService.getCourseDetail(id));
    }
}
