# 矢量猫科技企业官网

## 技术栈
- **前端**：React + TypeScript + Vite + Tailwind CSS + shadcn/ui + react-router-dom
- **后端**：Spring Boot 3.2 + MyBatis Plus 3.5 + MySQL 8.0 + SpringDoc OpenAPI
- **架构**：前后端分离 REST API，前端通过 typed fetch 调用后端接口

## 项目路径
- 前端：`C:/Users/18209/WorkBuddy/2026-06-29-08-50-11/app/`
- 后端：`C:/Users/18209/WorkBuddy/2026-06-29-08-50-11/backend/`

## 部署地址
- 前端：https://2e3aa64f2cf142e382bd1b762d9d25db.app.codebuddy.work
- 后端：http://localhost:8080（需 JDK 17 + Maven + MySQL 8.0 本地运行）

## 页面结构
- `/` 首页 (Hero + 优势 + 课程预览 + CTA)
- `/about` 关于我们 (公司故事 + 理念 + 团队 + 历程)
- `/services` 产品服务 (4门课程详情 + 教学特色 + 学习路径)
- `/contact` 联系我们 (预约表单 + 联系信息)
- `/admin` 管理后台 (仪表盘 + 课程/团队/历程/配置/预约管理) — 登录凭据 admin/admin123

## 数据库（12张表）
- site_config, banner, advantage, course, course_feature, course_level
- learning_path, company_info, team_member, milestone, service_feature, contact_submission

## API 接口
- **公开接口（10组）**：/api/site-config, /api/banners, /api/advantages, /api/courses, /api/learning-paths, /api/company-info, /api/team-members, /api/milestones, /api/service-features, /api/contact-submissions
- **管理接口（12组）**：/api/admin/auth, /api/admin/dashboard, /api/admin/courses, /api/admin/advantages, /api/admin/banners, /api/admin/team-members, /api/admin/milestones, /api/admin/service-features, /api/admin/learning-paths, /api/admin/company-info, /api/admin/site-config, /api/admin/contact-submissions

## 启动说明
1. 数据库：执行 backend/src/main/resources/db/init.sql
2. 后端：`cd backend && mvn spring-boot:run`
3. 前端：`cd app && npm run dev`
4. 前端会从 http://localhost:8080/api 获取数据

## 待完成
- 认证系统 Spring Security + JWT（目前为简单 Token 认证）
- 图片上传功能
