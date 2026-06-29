package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.TeamMember;
import com.vectorcat.service.TeamMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/team-members")
@RequiredArgsConstructor
@Tag(name = "Admin - 团队管理")
public class AdminTeamMemberController {

    private final TeamMemberService teamMemberService;

    @GetMapping
    @Operation(summary = "获取所有团队成员（含未激活）")
    public Result<List<TeamMember>> listAll() {
        return Result.success(teamMemberService.listAll());
    }

    @PostMapping
    @Operation(summary = "创建团队成员")
    public Result<TeamMember> create(@RequestBody TeamMember teamMember) {
        return Result.success(teamMemberService.create(teamMember));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新团队成员")
    public Result<TeamMember> update(@PathVariable Long id, @RequestBody TeamMember teamMember) {
        return Result.success(teamMemberService.update(id, teamMember));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除团队成员")
    public Result<String> delete(@PathVariable Long id) {
        teamMemberService.delete(id);
        return Result.success("操作成功");
    }
}
