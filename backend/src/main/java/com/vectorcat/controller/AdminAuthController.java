package com.vectorcat.controller;

import com.vectorcat.common.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@Tag(name = "Admin - 认证")
public class AdminAuthController {

    @PostMapping("/login")
    @Operation(summary = "管理员登录")
    public Result<Map<String, String>> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        if ("admin".equals(username) && "admin123".equals(password)) {
            Map<String, String> result = new HashMap<>();
            result.put("token", "admin-token-2026");
            result.put("username", "admin");
            return Result.success(result);
        }
        return Result.error("用户名或密码错误");
    }
}
