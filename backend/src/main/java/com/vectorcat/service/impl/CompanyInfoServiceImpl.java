package com.vectorcat.service.impl;

import com.vectorcat.entity.CompanyInfo;
import com.vectorcat.mapper.CompanyInfoMapper;
import com.vectorcat.service.CompanyInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyInfoServiceImpl implements CompanyInfoService {

    private final CompanyInfoMapper companyInfoMapper;

    @Override
    public Map<String, Object> getAllInfo() {
        Map<String, Object> result = new HashMap<>();
        result.put("story", getStory());
        result.put("values", getValues());
        return result;
    }

    @Override
    public List<CompanyInfo> getStory() {
        return companyInfoMapper.selectByType("story");
    }

    @Override
    public List<CompanyInfo> getValues() {
        return companyInfoMapper.selectByType("value");
    }

    @Override
    public List<CompanyInfo> listAll() {
        return companyInfoMapper.selectList(null);
    }

    @Override
    public CompanyInfo create(CompanyInfo companyInfo) {
        companyInfo.setCreatedAt(LocalDateTime.now());
        companyInfo.setUpdatedAt(LocalDateTime.now());
        companyInfoMapper.insert(companyInfo);
        return companyInfoMapper.selectById(companyInfo.getId());
    }

    @Override
    public CompanyInfo update(Long id, CompanyInfo companyInfo) {
        companyInfo.setId(id);
        companyInfo.setUpdatedAt(LocalDateTime.now());
        companyInfoMapper.updateById(companyInfo);
        return companyInfoMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        companyInfoMapper.deleteById(id);
    }
}
