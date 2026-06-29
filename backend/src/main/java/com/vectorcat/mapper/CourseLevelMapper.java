package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.CourseLevel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseLevelMapper extends BaseMapper<CourseLevel> {

    @Select("SELECT * FROM course_level WHERE course_id = #{courseId} ORDER BY sort_order")
    List<CourseLevel> selectByCourseId(@Param("courseId") Long courseId);
}
