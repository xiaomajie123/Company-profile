package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.ServiceFeature;
import com.vectorcat.mapper.ServiceFeatureMapper;
import com.vectorcat.service.ServiceFeatureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceFeatureServiceImpl implements ServiceFeatureService {

    private final ServiceFeatureMapper serviceFeatureMapper;

    @Override
    public List<ServiceFeature> getActiveFeatures() {
        LambdaQueryWrapper<ServiceFeature> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ServiceFeature::getIsActive, 1)
               .orderByAsc(ServiceFeature::getSortOrder);
        return serviceFeatureMapper.selectList(wrapper);
    }

    @Override
    public List<ServiceFeature> listAll() {
        LambdaQueryWrapper<ServiceFeature> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(ServiceFeature::getSortOrder);
        return serviceFeatureMapper.selectList(wrapper);
    }

    @Override
    public ServiceFeature create(ServiceFeature serviceFeature) {
        serviceFeature.setCreatedAt(LocalDateTime.now());
        serviceFeature.setUpdatedAt(LocalDateTime.now());
        serviceFeatureMapper.insert(serviceFeature);
        return serviceFeatureMapper.selectById(serviceFeature.getId());
    }

    @Override
    public ServiceFeature update(Long id, ServiceFeature serviceFeature) {
        serviceFeature.setId(id);
        serviceFeature.setUpdatedAt(LocalDateTime.now());
        serviceFeatureMapper.updateById(serviceFeature);
        return serviceFeatureMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        serviceFeatureMapper.deleteById(id);
    }
}
