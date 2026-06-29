package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.Advantage;
import com.vectorcat.mapper.AdvantageMapper;
import com.vectorcat.service.AdvantageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdvantageServiceImpl implements AdvantageService {

    private final AdvantageMapper advantageMapper;

    @Override
    public List<Advantage> getActiveAdvantages() {
        LambdaQueryWrapper<Advantage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Advantage::getIsActive, 1)
               .orderByAsc(Advantage::getSortOrder);
        return advantageMapper.selectList(wrapper);
    }

    @Override
    public List<Advantage> listAll() {
        LambdaQueryWrapper<Advantage> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Advantage::getSortOrder);
        return advantageMapper.selectList(wrapper);
    }

    @Override
    public Advantage create(Advantage advantage) {
        advantage.setCreatedAt(LocalDateTime.now());
        advantage.setUpdatedAt(LocalDateTime.now());
        advantageMapper.insert(advantage);
        return advantageMapper.selectById(advantage.getId());
    }

    @Override
    public Advantage update(Long id, Advantage advantage) {
        advantage.setId(id);
        advantage.setUpdatedAt(LocalDateTime.now());
        advantageMapper.updateById(advantage);
        return advantageMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        advantageMapper.deleteById(id);
    }
}
