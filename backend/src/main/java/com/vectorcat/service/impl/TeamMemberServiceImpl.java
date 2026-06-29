package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.TeamMember;
import com.vectorcat.mapper.TeamMemberMapper;
import com.vectorcat.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamMemberServiceImpl implements TeamMemberService {

    private final TeamMemberMapper teamMemberMapper;

    @Override
    public List<TeamMember> getActiveMembers() {
        LambdaQueryWrapper<TeamMember> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(TeamMember::getIsActive, 1)
               .orderByAsc(TeamMember::getSortOrder);
        return teamMemberMapper.selectList(wrapper);
    }

    @Override
    public List<TeamMember> listAll() {
        LambdaQueryWrapper<TeamMember> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(TeamMember::getSortOrder);
        return teamMemberMapper.selectList(wrapper);
    }

    @Override
    public TeamMember create(TeamMember teamMember) {
        teamMember.setCreatedAt(LocalDateTime.now());
        teamMember.setUpdatedAt(LocalDateTime.now());
        teamMemberMapper.insert(teamMember);
        return teamMemberMapper.selectById(teamMember.getId());
    }

    @Override
    public TeamMember update(Long id, TeamMember teamMember) {
        teamMember.setId(id);
        teamMember.setUpdatedAt(LocalDateTime.now());
        teamMemberMapper.updateById(teamMember);
        return teamMemberMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        teamMemberMapper.deleteById(id);
    }
}
