package com.vectorcat.service;

import com.vectorcat.entity.TeamMember;

import java.util.List;

public interface TeamMemberService {
    List<TeamMember> getActiveMembers();
    List<TeamMember> listAll();
    TeamMember create(TeamMember teamMember);
    TeamMember update(Long id, TeamMember teamMember);
    void delete(Long id);
}
