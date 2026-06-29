package com.vectorcat.service;

import com.vectorcat.entity.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    List<Course> getHomeCourses();
    Course getCourseDetail(Long id);
    List<Course> listAll();
    Course create(Course course);
    Course update(Long id, Course course);
    void delete(Long id);
}
