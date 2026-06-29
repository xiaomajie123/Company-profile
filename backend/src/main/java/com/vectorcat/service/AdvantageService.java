package com.vectorcat.service;

import com.vectorcat.entity.Advantage;

import java.util.List;

public interface AdvantageService {
    List<Advantage> getActiveAdvantages();
    List<Advantage> listAll();
    Advantage create(Advantage advantage);
    Advantage update(Long id, Advantage advantage);
    void delete(Long id);
}
