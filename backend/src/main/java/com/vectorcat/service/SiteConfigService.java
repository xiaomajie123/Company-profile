package com.vectorcat.service;

import com.vectorcat.entity.SiteConfig;

import java.util.List;
import java.util.Map;

public interface SiteConfigService {
    Map<String, String> getAllConfig();
    String getConfigValue(String key);
    void updateConfig(String key, String value);
    List<SiteConfig> listAll();
}
