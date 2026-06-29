package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.vectorcat.entity.SiteConfig;
import com.vectorcat.mapper.SiteConfigMapper;
import com.vectorcat.service.SiteConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SiteConfigServiceImpl implements SiteConfigService {

    private final SiteConfigMapper siteConfigMapper;

    @Override
    public Map<String, String> getAllConfig() {
        List<SiteConfig> configs = siteConfigMapper.selectList(null);
        Map<String, String> result = new HashMap<>();
        for (SiteConfig config : configs) {
            result.put(config.getConfigKey(), config.getConfigValue());
        }
        return result;
    }

    @Override
    public String getConfigValue(String key) {
        return siteConfigMapper.getValueByKey(key);
    }

    @Override
    public void updateConfig(String key, String value) {
        LambdaQueryWrapper<SiteConfig> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(SiteConfig::getConfigKey, key);
        SiteConfig existing = siteConfigMapper.selectOne(queryWrapper);
        if (existing != null) {
            LambdaUpdateWrapper<SiteConfig> updateWrapper = new LambdaUpdateWrapper<>();
            updateWrapper.eq(SiteConfig::getConfigKey, key)
                         .set(SiteConfig::getConfigValue, value)
                         .set(SiteConfig::getUpdatedAt, LocalDateTime.now());
            siteConfigMapper.update(updateWrapper);
        } else {
            SiteConfig config = new SiteConfig();
            config.setConfigKey(key);
            config.setConfigValue(value);
            config.setCreatedAt(LocalDateTime.now());
            config.setUpdatedAt(LocalDateTime.now());
            siteConfigMapper.insert(config);
        }
    }

    @Override
    public List<SiteConfig> listAll() {
        return siteConfigMapper.selectList(null);
    }
}
