package com.vectorcat.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.vectorcat.entity.ContactSubmission;

public interface ContactService {
    void submit(ContactSubmission submission);
    IPage<ContactSubmission> getSubmissions(int page, int size);
    IPage<ContactSubmission> getSubmissions(int page, int size, String status);
    void updateStatus(Long id, String status);
    void deleteSubmission(Long id);
}