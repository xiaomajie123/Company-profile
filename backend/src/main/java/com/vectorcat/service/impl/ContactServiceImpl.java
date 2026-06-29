package com.vectorcat.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.vectorcat.common.exception.BusinessException;
import com.vectorcat.entity.ContactSubmission;
import com.vectorcat.mapper.ContactSubmissionMapper;
import com.vectorcat.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactSubmissionMapper contactSubmissionMapper;

    @Override
    public void submit(ContactSubmission submission) {
        // Validate parentName
        String parentName = submission.getParentName();
        if (parentName == null || parentName.isBlank()) {
            throw new BusinessException("姓名不能为空");
        }
        if (parentName.length() < 2 || parentName.length() > 20) {
            throw new BusinessException("姓名长度应在2-20个字符之间");
        }

        // Validate phone
        String phone = submission.getPhone();
        if (phone == null || !phone.matches("1[3-9]\\d{9}")) {
            throw new BusinessException("手机号格式不正确");
        }

        submission.setStatus("pending");
        contactSubmissionMapper.insert(submission);
        log.info("New contact submission from: {}", parentName);
    }

    @Override
    public IPage<ContactSubmission> getSubmissions(int page, int size) {
        Page<ContactSubmission> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<ContactSubmission> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(ContactSubmission::getCreatedAt);
        return contactSubmissionMapper.selectPage(pageParam, wrapper);
    }

    @Override
    public IPage<ContactSubmission> getSubmissions(int page, int size, String status) {
        Page<ContactSubmission> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<ContactSubmission> wrapper = new LambdaQueryWrapper<>();
        if (status != null && !status.isBlank()) {
            wrapper.eq(ContactSubmission::getStatus, status);
        }
        wrapper.orderByDesc(ContactSubmission::getCreatedAt);
        return contactSubmissionMapper.selectPage(pageParam, wrapper);
    }

    @Override
    public void updateStatus(Long id, String status) {
        ContactSubmission submission = contactSubmissionMapper.selectById(id);
        if (submission == null) {
            throw new BusinessException("提交记录不存在");
        }
        submission.setStatus(status);
        contactSubmissionMapper.updateById(submission);
    }

    @Override
    public void deleteSubmission(Long id) {
        contactSubmissionMapper.deleteById(id);
    }
}
