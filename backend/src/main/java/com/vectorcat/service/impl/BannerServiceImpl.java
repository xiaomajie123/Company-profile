package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.vectorcat.entity.Banner;
import com.vectorcat.mapper.BannerMapper;
import com.vectorcat.service.BannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BannerServiceImpl implements BannerService {

    private final BannerMapper bannerMapper;

    @Override
    public List<Banner> getActiveBanners() {
        LambdaQueryWrapper<Banner> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Banner::getIsActive, 1)
               .orderByAsc(Banner::getSortOrder);
        return bannerMapper.selectList(wrapper);
    }

    @Override
    public List<Banner> listAll() {
        LambdaQueryWrapper<Banner> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Banner::getSortOrder);
        return bannerMapper.selectList(wrapper);
    }

    @Override
    public Banner create(Banner banner) {
        banner.setCreatedAt(LocalDateTime.now());
        banner.setUpdatedAt(LocalDateTime.now());
        bannerMapper.insert(banner);
        return bannerMapper.selectById(banner.getId());
    }

    @Override
    public Banner update(Long id, Banner banner) {
        banner.setId(id);
        banner.setUpdatedAt(LocalDateTime.now());
        bannerMapper.updateById(banner);
        return bannerMapper.selectById(id);
    }

    @Override
    public void delete(Long id) {
        bannerMapper.deleteById(id);
    }
}
