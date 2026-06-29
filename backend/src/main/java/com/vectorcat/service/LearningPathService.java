package com.vectorcat.service;

import com.vectorcat.entity.LearningPath;

import java.util.List;

public interface LearningPathService {
    List<LearningPath> getActivePaths();
    List<LearningPath> listAll();
    LearningPath create(LearningPath learningPath);
    LearningPath update(Long id, LearningPath learningPath);
    void delete(Long id);
}
