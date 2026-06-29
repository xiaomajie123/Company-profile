package com.vectorcat.service;

import com.vectorcat.entity.CompanyInfo;

import java.util.List;
import java.util.Map;

public interface CompanyInfoService {
    Map<String, Object> getAllInfo();
    List<CompanyInfo> getStory();
    List<CompanyInfo> getValues();
    List<CompanyInfo> listAll();
    CompanyInfo create(CompanyInfo companyInfo);
    CompanyInfo update(Long id, CompanyInfo companyInfo);
    void delete(Long id);
}
