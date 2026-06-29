package com.vectorcat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.vectorcat.entity.SiteConfig;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SiteConfigMapper extends BaseMapper<SiteConfig> {

    @Select("SELECT config_value FROM site_config WHERE config_key = #{key}")
    String getValueByKey(@Param("key") String key);
}
