package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.CompanyInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CompanyInfoMapper extends BaseMapper<CompanyInfo> {

    @Select("SELECT * FROM company_info WHERE info_type = #{infoType} AND is_active = 1 ORDER BY sort_order, paragraph_order")
    List<CompanyInfo> selectByType(@Param("infoType") String infoType);
}
