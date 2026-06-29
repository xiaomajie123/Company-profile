package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.Milestone;
import com.vectorcat.mapper.MilestoneMapper;
import com.vectorcat.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService {

    private final MilestoneMapper milestoneMapper;

    @Override
    public List<Milestone> getActiveMilestones() {
        LambdaQueryWrapper<Milestone> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Milestone::getIsActive, 1)
               .orderByAsc(Milestone::getSortOrder);
        return milestoneMapper.selectList(wrapper);
    }

    @Override
    public List<Milestone> listAll() {
        LambdaQueryWrapper<Milestone> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Milestone::getSortOrder);
        return milestoneMapper.selectList(wrapper);
    }

    @Override
    public Milestone create(Milestone milestone) {
        milestone.setCreatedAt(LocalDateTime.now());
        milestone.setUpdatedAt(LocalDateTime.now());
        milestoneMapper.insert(milestone);
        return milestoneMapper.selectById(milestone.getId());
    }

    @Override
    public Milestone update(Long id, Milestone milestone) {
        milestone.setId(id);
        milestone.setUpdatedAt(LocalDateTime.now());
        milestoneMapper.updateById(milestone);
        return milestoneMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        milestoneMapper.deleteById(id);
    }
}
