package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.LearningPath;
import com.vectorcat.mapper.LearningPathMapper;
import com.vectorcat.service.LearningPathService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LearningPathServiceImpl implements LearningPathService {

    private final LearningPathMapper learningPathMapper;

    @Override
    public List<LearningPath> getActivePaths() {
        LambdaQueryWrapper<LearningPath> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(LearningPath::getIsActive, 1)
               .orderByAsc(LearningPath::getSortOrder);
        return learningPathMapper.selectList(wrapper);
    }

    @Override
    public List<LearningPath> listAll() {
        LambdaQueryWrapper<LearningPath> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(LearningPath::getSortOrder);
        return learningPathMapper.selectList(wrapper);
    }

    @Override
    public LearningPath create(LearningPath learningPath) {
        learningPath.setCreatedAt(LocalDateTime.now());
        learningPath.setUpdatedAt(LocalDateTime.now());
        learningPathMapper.insert(learningPath);
        return learningPathMapper.selectById(learningPath.getId());
    }

    @Override
    public LearningPath update(Long id, LearningPath learningPath) {
        learningPath.setId(id);
        learningPath.setUpdatedAt(LocalDateTime.now());
        learningPathMapper.updateById(learningPath);
        return learningPathMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        learningPathMapper.deleteById(id);
    }
}
