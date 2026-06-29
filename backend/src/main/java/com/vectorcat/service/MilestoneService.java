package com.vectorcat.service;

import com.vectorcat.entity.Milestone;

import java.util.List;

public interface MilestoneService {
    List<Milestone> getActiveMilestones();
    List<Milestone> listAll();
    Milestone create(Milestone milestone);
    Milestone update(Long id, Milestone milestone);
    void delete(Long id);
}
