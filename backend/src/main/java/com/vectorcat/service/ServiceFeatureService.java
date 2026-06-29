package com.vectorcat.service;

import com.vectorcat.entity.ServiceFeature;

import java.util.List;

public interface ServiceFeatureService {
    List<ServiceFeature> getActiveFeatures();
    List<ServiceFeature> listAll();
    ServiceFeature create(ServiceFeature serviceFeature);
    ServiceFeature update(Long id, ServiceFeature serviceFeature);
    void delete(Long id);
}
