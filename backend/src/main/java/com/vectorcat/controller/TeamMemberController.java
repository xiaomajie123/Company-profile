package com.vectorcat.controller;

import com.vectorcat.common.Result;
import com.vectorcat.entity.TeamMember;
import com.vectorcat.service.TeamMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/team-members")
@RequiredArgsConstructor
@Tag(name = "团队成员", description = "团队成员相关接口")
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @GetMapping
    @Operation(summary = "获取所有启用的团队成员")
    public Result<List<TeamMember>> getTeamMembers() {
        return Result.success(teamMemberService.getActiveMembers());
    }
}
