package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.Course;
import com.vectorcat.entity.CourseFeature;
import com.vectorcat.entity.CourseLevel;
import com.vectorcat.mapper.CourseFeatureMapper;
import com.vectorcat.mapper.CourseLevelMapper;
import com.vectorcat.mapper.CourseMapper;
import com.vectorcat.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseMapper courseMapper;
    private final CourseFeatureMapper courseFeatureMapper;
    private final CourseLevelMapper courseLevelMapper;

    @Override
    public List<Course> getAllCourses() {
        LambdaQueryWrapper<Course> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Course::getIsActive, 1)
               .orderByAsc(Course::getSortOrder);
        List<Course> courses = courseMapper.selectList(wrapper);
        for (Course course : courses) {
            course.setFeatures(courseFeatureMapper.selectByCourseId(course.getId()));
            course.setLevels(courseLevelMapper.selectByCourseId(course.getId()));
        }
        return courses;
    }

    @Override
    public List<Course> getHomeCourses() {
        List<Course> courses = courseMapper.selectHomeCourses();
        for (Course course : courses) {
            course.setFeatures(courseFeatureMapper.selectByCourseId(course.getId()));
            course.setLevels(courseLevelMapper.selectByCourseId(course.getId()));
        }
        return courses;
    }

    @Override
    public Course getCourseDetail(Long id) {
        Course course = courseMapper.selectById(id);
        if (course != null) {
            course.setFeatures(courseFeatureMapper.selectByCourseId(course.getId()));
            course.setLevels(courseLevelMapper.selectByCourseId(course.getId()));
        }
        return course;
    }

    @Override
    public List<Course> listAll() {
        List<Course> courses = courseMapper.selectList(null);
        for (Course course : courses) {
            course.setFeatures(courseFeatureMapper.selectByCourseId(course.getId()));
            course.setLevels(courseLevelMapper.selectByCourseId(course.getId()));
        }
        return courses;
    }

    @Override
    @Transactional
    public Course create(Course course) {
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        courseMapper.insert(course);

        if (course.getFeatures() != null) {
            for (CourseFeature feature : course.getFeatures()) {
                feature.setCourseId(course.getId());
                feature.setCreatedAt(LocalDateTime.now());
                courseFeatureMapper.insert(feature);
            }
        }
        if (course.getLevels() != null) {
            for (CourseLevel level : course.getLevels()) {
                level.setCourseId(course.getId());
                level.setCreatedAt(LocalDateTime.now());
                courseLevelMapper.insert(level);
            }
        }
        return getCourseDetail(course.getId());
    }

    @Override
    @Transactional
    public Course update(Long id, Course course) {
        course.setId(id);
        course.setUpdatedAt(LocalDateTime.now());
        courseMapper.updateById(course);

        // Delete existing features and levels
        LambdaQueryWrapper<CourseFeature> featureWrapper = new LambdaQueryWrapper<>();
        featureWrapper.eq(CourseFeature::getCourseId, id);
        courseFeatureMapper.delete(featureWrapper);

        LambdaQueryWrapper<CourseLevel> levelWrapper = new LambdaQueryWrapper<>();
        levelWrapper.eq(CourseLevel::getCourseId, id);
        courseLevelMapper.delete(levelWrapper);

        // Re-insert features and levels
        if (course.getFeatures() != null) {
            for (CourseFeature feature : course.getFeatures()) {
                feature.setCourseId(id);
                feature.setCreatedAt(LocalDateTime.now());
                courseFeatureMapper.insert(feature);
            }
        }
        if (course.getLevels() != null) {
            for (CourseLevel level : course.getLevels()) {
                level.setCourseId(id);
                level.setCreatedAt(LocalDateTime.now());
                courseLevelMapper.insert(level);
            }
        }
        return getCourseDetail(id);
    }

    @Override
    public void delete(Long id) {
        courseMapper.deleteById(id);
    }
}
