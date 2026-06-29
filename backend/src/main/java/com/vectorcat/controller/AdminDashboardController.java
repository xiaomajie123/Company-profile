package com.vectorcat.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.common.Result;
import com.vectorcat.entity.ContactSubmission;
import com.vectorcat.mapper.ContactSubmissionMapper;
import com.vectorcat.mapper.CourseMapper;
import com.vectorcat.mapper.MilestoneMapper;
import com.vectorcat.mapper.TeamMemberMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@Tag(name = "Admin - 仪表盘")
public class AdminDashboardController {

    private final CourseMapper courseMapper;
    private final TeamMemberMapper teamMemberMapper;
    private final MilestoneMapper milestoneMapper;
    private final ContactSubmissionMapper contactSubmissionMapper;

    @GetMapping("/stats")
    @Operation(summary = "获取仪表盘统计数据")
    public Result<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();

        Long totalCourses = courseMapper.selectCount(null);
        Long totalTeamMembers = teamMemberMapper.selectCount(null);
        Long totalMilestones = milestoneMapper.selectCount(null);

        LambdaQueryWrapper<ContactSubmission> pendingWrapper = new LambdaQueryWrapper<>();
        pendingWrapper.eq(ContactSubmission::getStatus, "pending");
        Long pendingContacts = contactSubmissionMapper.selectCount(pendingWrapper);

        Long totalContacts = contactSubmissionMapper.selectCount(null);

        LambdaQueryWrapper<ContactSubmission> contactedWrapper = new LambdaQueryWrapper<>();
        contactedWrapper.eq(ContactSubmission::getStatus, "contacted");
        Long contactedContacts = contactSubmissionMapper.selectCount(contactedWrapper);

        stats.put("totalCourses", totalCourses);
        stats.put("totalTeamMembers", totalTeamMembers);
        stats.put("totalMilestones", totalMilestones);
        stats.put("pendingContacts", pendingContacts);
        stats.put("totalContacts", totalContacts);
        stats.put("contactedContacts", contactedContacts);

        return Result.success(stats);
    }
}
