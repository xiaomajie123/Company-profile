package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseMapper extends BaseMapper<Course> {

    @Select("SELECT * FROM course WHERE is_active = 1 AND is_show_home = 1 ORDER BY sort_order")
    List<Course> selectHomeCourses();
}
