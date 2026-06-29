package com.vectorcat.service;

import com.vectorcat.entity.Banner;

import java.util.List;

public interface BannerService {
    List<Banner> getActiveBanners();
    List<Banner> listAll();
    Banner create(Banner banner);
    Banner update(Long id, Banner banner);
    void delete(Long id);
}
