package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.TeamMember;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TeamMemberMapper extends BaseMapper<TeamMember> {
}
