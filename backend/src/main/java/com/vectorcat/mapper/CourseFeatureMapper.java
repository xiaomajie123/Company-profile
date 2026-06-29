package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.CourseFeature;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseFeatureMapper extends BaseMapper<CourseFeature> {

    @Select("SELECT * FROM course_feature WHERE course_id = #{courseId} ORDER BY sort_order")
    List<CourseFeature> selectByCourseId(@Param("courseId") Long courseId);
}
