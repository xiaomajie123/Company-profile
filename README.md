# 矢量猫科技企业官网 - 全栈开发需求文档

> 项目：重庆矢量猫科技有限公司企业官网（少儿编程）  
> 版本：v2.0 — 后端动态化改造  
> 日期：2026-06-29

---

## 一、项目概述

### 1.1 项目目标

将当前静态企业官网改造为**前后端分离的全栈应用**，所有页面内容通过后端 API 动态加载，支持管理后台对页面配置内容进行增删改查。

### 1.2 网站页面结构

| 页面     | 路由        | 说明                                      |
| -------- | ----------- | ----------------------------------------- |
| 首页     | `/`         | Hero区 + 核心优势 + 分龄课程 + CTA        |
| 关于我们 | `/about`    | 公司故事 + 教育理念 + 核心团队 + 发展历程 |
| 产品服务 | `/services` | 课程详情 + 教学特色 + 学习路径            |
| 联系我们 | `/contact`  | 预约表单 + 联系信息 + 地图区域            |

### 1.3 用户角色

| 角色            | 说明                                     |
| --------------- | ---------------------------------------- |
| 访客（Visitor） | 浏览官网、提交预约表单                   |
| 管理员（Admin） | 登录管理后台，配置页面内容，查看预约数据 |

---

## 二、技术架构

### 2.1 技术栈

| 层级            | 技术                                     | 版本  |
| --------------- | ---------------------------------------- | ----- |
| **后端框架**    | Spring Boot                              | 3.x   |
| **ORM**         | MyBatis Plus                             | 3.5.x |
| **数据库**      | MySQL                                    | 8.0   |
| **连接池**      | HikariCP（Spring Boot 默认）             | -     |
| **API 文档**    | SpringDoc OpenAPI (Swagger)              | 2.x   |
| **数据校验**    | Jakarta Validation (Hibernate Validator) | -     |
| **JSON 处理**   | Jackson（Spring Boot 默认）              | -     |
| **跨域**        | Spring Web CORS                          | -     |
| **前端框架**    | React + TypeScript                       | 18.x  |
| **构建工具**    | Vite                                     | 7.x   |
| **CSS 框架**    | Tailwind CSS + shadcn/ui                 | -     |
| **路由**        | react-router-dom                         | 6.x   |
| **HTTP 客户端** | fetch（typed wrapper）                   | 原生  |

### 2.2 架构图

```
┌─────────────────────────────────────────────────────────┐
│                    浏览器 (Browser)                      │
│  ┌──────────────────────┐  ┌──────────────────────────┐ │
│  │   前端 (React SPA)    │  │   管理后台 (React SPA)    │ │
│  │   port 5173 (dev)    │  │   (后续迭代)              │ │
│  └──────────┬───────────┘  └────────────┬─────────────┘ │
└─────────────┼──────────────────────────┼────────────────┘
              │  REST API (JSON)         │
              ▼                          ▼
┌─────────────────────────────────────────────────────────┐
│              后端 (Spring Boot 3) port 8080              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │Controller│→ │ Service  │→ │ Repository/MyBatis   │  │
│  │  Layer   │  │  Layer   │  │ Plus Mapper          │  │
│  └──────────┘  └──────────┘  └──────────┬───────────┘  │
└─────────────────────────────────────────┼────────────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │   MySQL 8.0 数据库     │
                              │   vectorcat_db         │
                              └───────────────────────┘
```

### 2.3 项目结构

```
backend/
├── pom.xml
├── src/main/java/com/vectorcat/
│   ├── VectorCatApplication.java          # 启动类
│   ├── common/
│   │   ├── Result.java                    # 统一响应格式
│   │   ├── PageResult.java                # 分页响应格式
│   │   └── exception/
│   │       ├── BusinessException.java     # 业务异常
│   │       └── GlobalExceptionHandler.java # 全局异常处理
│   ├── config/
│   │   ├── CorsConfig.java                # 跨域配置
│   │   ├── MyBatisPlusConfig.java         # MyBatis Plus 配置
│   │   └── SwaggerConfig.java             # API 文档配置
│   ├── controller/
│   │   ├── SiteConfigController.java      # 站点配置
│   │   ├── BannerController.java          # 首页横幅
│   │   ├── AdvantageController.java       # 优势特色
│   │   ├── CourseController.java          # 课程管理
│   │   ├── CourseFeatureController.java   # 课程特色
│   │   ├── LearningPathController.java    # 学习路径
│   │   ├── TeamMemberController.java      # 团队成员
│   │   ├── MilestoneController.java       # 发展历程
│   │   ├── CompanyInfoController.java     # 公司信息
│   │   ├── ServiceFeatureController.java  # 教学服务特色
│   │   └── ContactController.java         # 联系我们
│   ├── entity/
│   │   ├── SiteConfig.java
│   │   ├── Banner.java
│   │   ├── Advantage.java
│   │   ├── Course.java
│   │   ├── CourseFeature.java
│   │   ├── LearningPath.java
│   │   ├── TeamMember.java
│   │   ├── Milestone.java
│   │   ├── CompanyInfo.java
│   │   ├── ServiceFeature.java
│   │   └── ContactSubmission.java
│   ├── mapper/
│   │   ├── SiteConfigMapper.java
│   │   ├── BannerMapper.java
│   │   ├── AdvantageMapper.java
│   │   ├── CourseMapper.java
│   │   ├── CourseFeatureMapper.java
│   │   ├── LearningPathMapper.java
│   │   ├── TeamMemberMapper.java
│   │   ├── MilestoneMapper.java
│   │   ├── CompanyInfoMapper.java
│   │   ├── ServiceFeatureMapper.java
│   │   └── ContactSubmissionMapper.java
│   ├── service/
│   │   ├── SiteConfigService.java
│   │   ├── BannerService.java
│   │   ├── AdvantageService.java
│   │   ├── CourseService.java
│   │   ├── LearningPathService.java
│   │   ├── TeamMemberService.java
│   │   ├── MilestoneService.java
│   │   ├── CompanyInfoService.java
│   │   ├── ServiceFeatureService.java
│   │   └── ContactService.java
│   └── service/impl/
│       └── ... (对应实现类)
└── src/main/resources/
    ├── application.yml                     # 应用配置
    ├── application-dev.yml                 # 开发环境配置
    └── db/
        └── init.sql                        # 数据库初始化脚本
```

---

## 三、数据库设计

### 3.1 数据库信息

- **数据库名**：`vectorcat_db`
- **字符集**：`utf8mb4`
- **排序规则**：`utf8mb4_unicode_ci`

### 3.2 数据表清单

| 序号 | 表名                 | 说明          | 页面关联        |
| ---- | -------------------- | ------------- | --------------- |
| 1    | `site_config`        | 站点全局配置  | 全站            |
| 2    | `banner`             | Hero 横幅配置 | 首页            |
| 3    | `advantage`          | 核心优势      | 首页            |
| 4    | `course`             | 课程信息      | 首页 + 产品服务 |
| 5    | `course_feature`     | 课程特色亮点  | 产品服务        |
| 6    | `learning_path`      | 学习路径      | 产品服务        |
| 7    | `company_info`       | 公司信息      | 关于我们        |
| 8    | `team_member`        | 团队成员      | 关于我们        |
| 9    | `milestone`          | 发展历程      | 关于我们        |
| 10   | `service_feature`    | 教学服务特色  | 产品服务        |
| 11   | `contact_submission` | 预约试听提交  | 联系我们        |

### 3.3 详细表结构

#### 3.3.1 site_config — 站点全局配置

| 字段         | 类型         | 约束                        | 说明                    |
| ------------ | ------------ | --------------------------- | ----------------------- |
| id           | BIGINT       | PK, AUTO_INCREMENT          | 主键                    |
| config_key   | VARCHAR(50)  | UNIQUE, NOT NULL            | 配置键                  |
| config_value | TEXT         | NOT NULL                    | 配置值                  |
| config_type  | VARCHAR(20)  | DEFAULT 'text'              | 值类型(text/json/image) |
| description  | VARCHAR(200) |                             | 配置说明                |
| created_at   | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间                |
| updated_at   | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间                |

**预设配置项**：

| config_key                  | config_value                                | 说明           |
| --------------------------- | ------------------------------------------- | -------------- |
| company_name                | 重庆矢量猫科技有限公司                      | 公司名称       |
| company_name_en             | VectorCat Tech                              | 公司英文名     |
| phone                       | 400-XXX-XXXX                                | 联系电话       |
| email                       | contact@vectorcat.cn                        | 联系邮箱       |
| address                     | 重庆市渝北区XXXX路XX号                      | 公司地址       |
| business_hours              | 周一至周日 9:00 - 21:00                     | 营业时间       |
| hero_badge                  | 2025 暑期班火热报名中                       | Hero 角标文本  |
| hero_title_1                | 用编程                                      | Hero 标题1     |
| hero_title_2                | 开启孩子的                                  | Hero 标题2     |
| hero_title_3                | 未来创造力                                  | Hero 标题3     |
| hero_subtitle               | 重庆矢量猫科技，专注6-16岁青少年编程教育... | Hero 副标题    |
| cta_primary                 | 预约免费试听                                | 主按钮文字     |
| cta_secondary               | 了解课程体系                                | 次按钮文字     |
| stats_students              | 500+                                        | 在读学员数     |
| stats_renewal               | 96%                                         | 续课率         |
| stats_awards                | 200+                                        | 竞赛获奖数     |
| about_page_title            | 关于矢量猫科技                              | 关于页标题     |
| about_page_subtitle         | 我们是一家充满热情与创造力的...             | 关于页副标题   |
| about_story_title           | 从热爱到使命                                | 公司故事标题   |
| about_story_paragraph_1/2/3 | ...                                         | 公司故事段落   |
| about_values_title          | 我们的教育理念                              | 教育理念标题   |
| about_values_subtitle       | 用正确的理念，做正确的教育                  | 教育理念副标题 |
| about_team_title            | 核心教学团队                                | 团队标题       |
| about_team_subtitle         | 来自名校、热爱教育...                       | 团队副标题     |
| about_milestone_title       | 发展历程                                    | 里程碑标题     |
| about_milestone_subtitle    | 每一步，都走得扎实                          | 里程碑副标题   |
| services_page_title         | 产品服务体系                                | 服务页标题     |
| services_page_subtitle      | 科学的课程体系...                           | 服务页副标题   |
| services_feature_title      | 教学服务特色                                | 服务特色标题   |
| services_feature_subtitle   | 不止于课堂...                               | 服务特色副标题 |
| services_path_title         | 学习成长路径                                | 学习路径标题   |
| services_path_subtitle      | 从入门到竞赛...                             | 学习路径副标题 |
| home_advantages_title       | 为什么选择矢量猫？                          | 优势标题       |
| home_advantages_subtitle    | 我们用心打磨每一堂课...                     | 优势副标题     |
| home_courses_title          | 分龄课程体系                                | 课程标题       |
| home_courses_subtitle       | 科学分级，因材施教...                       | 课程副标题     |
| cta_section_title           | 让孩子领先一步...                           | CTA 标题       |
| cta_section_subtitle        | 现在预约...                                 | CTA 副标题     |
| contact_page_title          | 联系我们                                    | 联系页标题     |
| contact_page_subtitle       | 预约免费试听课...                           | 联系页副标题   |
| contact_form_title          | 预约免费试听                                | 表单标题       |
| contact_form_subtitle       | 填写以下信息...                             | 表单副标题     |
| contact_info_title          | 联系方式                                    | 联系信息标题   |
| contact_info_subtitle       | 您也可以通过以下方式...                     | 联系信息副标题 |

#### 3.3.2 banner — Hero 横幅配置

| 字段       | 类型         | 约束                        | 说明     |
| ---------- | ------------ | --------------------------- | -------- |
| id         | BIGINT       | PK, AUTO_INCREMENT          | 主键     |
| title      | VARCHAR(100) | NOT NULL                    | 标题     |
| subtitle   | VARCHAR(200) |                             | 副标题   |
| image_url  | VARCHAR(500) |                             | 图片地址 |
| link_url   | VARCHAR(500) |                             | 链接地址 |
| sort_order | INT          | DEFAULT 0                   | 排序     |
| is_active  | TINYINT(1)   | DEFAULT 1                   | 是否启用 |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间 |
| updated_at | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 3.3.3 advantage — 核心优势

| 字段        | 类型         | 约束                        | 说明     |
| ----------- | ------------ | --------------------------- | -------- |
| id          | BIGINT       | PK, AUTO_INCREMENT          | 主键     |
| icon        | VARCHAR(50)  | NOT NULL                    | 图标标识 |
| title       | VARCHAR(50)  | NOT NULL                    | 标题     |
| description | VARCHAR(200) | NOT NULL                    | 描述     |
| sort_order  | INT          | DEFAULT 0                   | 排序     |
| is_active   | TINYINT(1)   | DEFAULT 1                   | 是否启用 |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间 |
| updated_at  | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 3.3.4 course — 课程信息

| 字段         | 类型         | 约束                        | 说明                    |
| ------------ | ------------ | --------------------------- | ----------------------- |
| id           | BIGINT       | PK, AUTO_INCREMENT          | 主键                    |
| name         | VARCHAR(100) | NOT NULL                    | 课程名称                |
| subtitle     | VARCHAR(100) |                             | 副标题                  |
| description  | TEXT         |                             | 课程描述                |
| age_range    | VARCHAR(20)  |                             | 适合年龄段（如：6-8岁） |
| icon         | VARCHAR(50)  |                             | 图标标识                |
| color_class  | VARCHAR(50)  |                             | 颜色样式类              |
| min_age      | INT          |                             | 最小年龄                |
| max_age      | INT          |                             | 最大年龄                |
| duration     | VARCHAR(50)  |                             | 课时安排                |
| sort_order   | INT          | DEFAULT 0                   | 排序                    |
| is_active    | TINYINT(1)   | DEFAULT 1                   | 是否启用                |
| is_show_home | TINYINT(1)   | DEFAULT 1                   | 是否首页展示            |
| created_at   | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间                |
| updated_at   | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间                |

**预设数据**：

| name             | subtitle               | age_range | icon | color_class                   | duration               | sort_order |
| ---------------- | ---------------------- | --------- | ---- | ----------------------------- | ---------------------- | ---------- |
| Scratch 创意启蒙 | 编程启蒙，从兴趣开始   | 6-8岁     | 🧩    | from-amber-400 to-orange-500  | 每期32课时 / 每周2课时 | 1          |
| Python 进阶编程  | 从积木到代码的跨越     | 8-12岁    | 🐍    | from-blue-400 to-indigo-500   | 每期36课时 / 每周2课时 | 2          |
| 机器人编程       | 软硬结合，手脑并用     | 10-14岁   | 🤖    | from-emerald-400 to-teal-500  | 每期36课时 / 每周2课时 | 3          |
| 信息学奥赛特训   | 冲刺权威竞赛，助力升学 | 12-16岁   | 🏅    | from-purple-400 to-violet-500 | 每期48课时 / 每周3课时 | 4          |

#### 3.3.5 course_feature — 课程特色

| 字段       | 类型         | 约束                      | 说明     |
| ---------- | ------------ | ------------------------- | -------- |
| id         | BIGINT       | PK, AUTO_INCREMENT        | 主键     |
| course_id  | BIGINT       | FK → course.id, NOT NULL  | 所属课程 |
| content    | VARCHAR(200) | NOT NULL                  | 特色描述 |
| sort_order | INT          | DEFAULT 0                 | 排序     |
| created_at | DATETIME     | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

#### 3.3.6 course_level — 课程级别

| 字段       | 类型        | 约束                     | 说明                   |
| ---------- | ----------- | ------------------------ | ---------------------- |
| id         | BIGINT      | PK, AUTO_INCREMENT       | 主键                   |
| course_id  | BIGINT      | FK → course.id, NOT NULL | 所属课程               |
| name       | VARCHAR(50) | NOT NULL                 | 级别名称（如：启蒙班） |
| sort_order | INT         | DEFAULT 0                | 排序                   |

#### 3.3.7 learning_path — 学习路径

| 字段        | 类型        | 约束                      | 说明               |
| ----------- | ----------- | ------------------------- | ------------------ |
| id          | BIGINT      | PK, AUTO_INCREMENT        | 主键               |
| step_number | VARCHAR(10) | NOT NULL                  | 步骤编号（如：01） |
| title       | VARCHAR(50) | NOT NULL                  | 步骤标题           |
| age_range   | VARCHAR(20) |                           | 年龄段             |
| icon        | VARCHAR(50) |                           | 图标               |
| sort_order  | INT         | DEFAULT 0                 | 排序               |
| is_active   | TINYINT(1)  | DEFAULT 1                 | 是否启用           |
| created_at  | DATETIME    | DEFAULT CURRENT_TIMESTAMP | 创建时间           |

#### 3.3.8 company_info — 公司信息 / 教育理念

| 字段            | 类型         | 约束                        | 说明                      |
| --------------- | ------------ | --------------------------- | ------------------------- |
| id              | BIGINT       | PK, AUTO_INCREMENT          | 主键                      |
| info_type       | VARCHAR(30)  | NOT NULL                    | 信息类型（story / value） |
| title           | VARCHAR(100) | NOT NULL                    | 标题                      |
| icon            | VARCHAR(50)  |                             | 图标                      |
| content         | TEXT         |                             | 内容（story 类型使用）    |
| description     | VARCHAR(200) |                             | 描述（value 类型使用）    |
| paragraph_order | INT          |                             | 段落排序（story 类型）    |
| sort_order      | INT          | DEFAULT 0                   | 排序                      |
| is_active       | TINYINT(1)   | DEFAULT 1                   | 是否启用                  |
| created_at      | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间                  |
| updated_at      | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间                  |

#### 3.3.9 team_member — 团队成员

| 字段        | 类型         | 约束                        | 说明         |
| ----------- | ------------ | --------------------------- | ------------ |
| id          | BIGINT       | PK, AUTO_INCREMENT          | 主键         |
| name        | VARCHAR(30)  | NOT NULL                    | 姓名         |
| title       | VARCHAR(50)  | NOT NULL                    | 职位         |
| description | VARCHAR(200) |                             | 简介         |
| avatar      | VARCHAR(50)  |                             | 头像图标     |
| avatar_url  | VARCHAR(500) |                             | 头像图片地址 |
| sort_order  | INT          | DEFAULT 0                   | 排序         |
| is_active   | TINYINT(1)   | DEFAULT 1                   | 是否启用     |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间     |
| updated_at  | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间     |

#### 3.3.10 milestone — 发展历程

| 字段        | 类型         | 约束                        | 说明     |
| ----------- | ------------ | --------------------------- | -------- |
| id          | BIGINT       | PK, AUTO_INCREMENT          | 主键     |
| year        | VARCHAR(10)  | NOT NULL                    | 年份     |
| title       | VARCHAR(100) | NOT NULL                    | 标题     |
| description | VARCHAR(200) |                             | 描述     |
| sort_order  | INT          | DEFAULT 0                   | 排序     |
| is_active   | TINYINT(1)   | DEFAULT 1                   | 是否启用 |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间 |
| updated_at  | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 3.3.11 service_feature — 教学服务特色

| 字段        | 类型         | 约束                        | 说明     |
| ----------- | ------------ | --------------------------- | -------- |
| id          | BIGINT       | PK, AUTO_INCREMENT          | 主键     |
| icon        | VARCHAR(50)  | NOT NULL                    | 图标     |
| title       | VARCHAR(50)  | NOT NULL                    | 标题     |
| description | VARCHAR(200) | NOT NULL                    | 描述     |
| sort_order  | INT          | DEFAULT 0                   | 排序     |
| is_active   | TINYINT(1)   | DEFAULT 1                   | 是否启用 |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 创建时间 |
| updated_at  | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 3.3.12 contact_submission — 预约试听提交

| 字段        | 类型         | 约束                        | 说明       |
| ----------- | ------------ | --------------------------- | ---------- |
| id          | BIGINT       | PK, AUTO_INCREMENT          | 主键       |
| parent_name | VARCHAR(30)  | NOT NULL                    | 家长姓名   |
| phone       | VARCHAR(20)  | NOT NULL                    | 联系电话   |
| child_age   | VARCHAR(20)  |                             | 孩子年龄段 |
| message     | TEXT         |                             | 留言       |
| status      | VARCHAR(20)  | DEFAULT 'pending'           | 处理状态   |
| remark      | VARCHAR(500) |                             | 管理员备注 |
| ip_address  | VARCHAR(50)  |                             | 提交IP     |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP   | 提交时间   |
| updated_at  | DATETIME     | ON UPDATE CURRENT_TIMESTAMP | 更新时间   |

**状态枚举**：`pending`（待处理）、`contacted`（已联系）、`converted`（已转化）、`invalid`（无效）

---

## 四、API 接口设计

### 4.1 接口规范

- **Base URL**：`http://localhost:8080/api`
- **请求格式**：`application/json`
- **响应格式**：统一 JSON

```json
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": { ... }
}

// 列表响应
{
  "code": 200,
  "message": "success",
  "data": [ ... ]
}

// 分页响应
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [ ... ],
    "total": 100,
    "size": 10,
    "current": 1,
    "pages": 10
  }
}

// 错误响应
{
  "code": 400,
  "message": "参数校验失败",
  "data": null
}
```

### 4.2 公开接口（访客端，无需认证）

#### 4.2.1 站点配置

| 方法 | 路径                     | 说明                              |
| ---- | ------------------------ | --------------------------------- |
| GET  | `/api/site-config`       | 获取所有站点配置（Key-Value Map） |
| GET  | `/api/site-config/{key}` | 获取单个配置项                    |

#### 4.2.2 Banner 横幅

| 方法 | 路径           | 说明                                         |
| ---- | -------------- | -------------------------------------------- |
| GET  | `/api/banners` | 获取启用的 Banner 列表（按 sort_order 排序） |

#### 4.2.3 核心优势

| 方法 | 路径              | 说明               |
| ---- | ----------------- | ------------------ |
| GET  | `/api/advantages` | 获取启用的优势列表 |

#### 4.2.4 课程信息

| 方法 | 路径                | 说明                                                    |
| ---- | ------------------- | ------------------------------------------------------- |
| GET  | `/api/courses`      | 获取所有启用的课程列表（含特色 features 和级别 levels） |
| GET  | `/api/courses/home` | 获取首页展示的课程列表（精简字段）                      |
| GET  | `/api/courses/{id}` | 获取课程详情（含特色和级别）                            |

#### 4.2.5 学习路径

| 方法 | 路径                  | 说明             |
| ---- | --------------------- | ---------------- |
| GET  | `/api/learning-paths` | 获取学习路径列表 |

#### 4.2.6 公司信息 / 教育理念

| 方法 | 路径                       | 说明                                         |
| ---- | -------------------------- | -------------------------------------------- |
| GET  | `/api/company-info`        | 获取所有公司信息（含故事和理念，按类型分组） |
| GET  | `/api/company-info/story`  | 获取公司故事（段落列表）                     |
| GET  | `/api/company-info/values` | 获取教育理念列表                             |

#### 4.2.7 团队成员

| 方法 | 路径                | 说明                   |
| ---- | ------------------- | ---------------------- |
| GET  | `/api/team-members` | 获取启用的团队成员列表 |

#### 4.2.8 发展历程

| 方法 | 路径              | 说明                                       |
| ---- | ----------------- | ------------------------------------------ |
| GET  | `/api/milestones` | 获取启用的里程碑列表（按 sort_order 排序） |

#### 4.2.9 教学服务特色

| 方法 | 路径                    | 说明                   |
| ---- | ----------------------- | ---------------------- |
| GET  | `/api/service-features` | 获取启用的服务特色列表 |

#### 4.2.10 预约提交

| 方法 | 路径                       | 说明             |
| ---- | -------------------------- | ---------------- |
| POST | `/api/contact-submissions` | 提交预约试听表单 |

**请求体**：

```json
{
  "parentName": "张先生",
  "phone": "13800138000",
  "childAge": "6-8岁",
  "message": "想了解Scratch课程"
}
```

**校验规则**：

- `parentName`：必填，2-20个字符
- `phone`：必填，中国大陆手机号格式（1[3-9]\d{9}）
- `childAge`：选填
- `message`：选填，最多500字符

### 4.3 管理接口（管理员端，需认证 — 后续迭代）

所有管理端 CRUD 接口遵循 RESTful 规范：

| 实体                | GET /api/admin/{entity} | POST /api/admin/{entity} | PUT /api/admin/{entity}/{id} | DELETE /api/admin/{entity}/{id} |
| ------------------- | ----------------------- | ------------------------ | ---------------------------- | ------------------------------- |
| banners             | ✅ 列表                  | ✅ 新增                   | ✅ 修改                       | ✅ 逻辑删除                      |
| advantages          | ✅                       | ✅                        | ✅                            | ✅                               |
| courses             | ✅                       | ✅                        | ✅                            | ✅                               |
| course-features     | ✅                       | ✅                        | ✅                            | ✅                               |
| course-levels       | ✅                       | ✅                        | ✅                            | ✅                               |
| learning-paths      | ✅                       | ✅                        | ✅                            | ✅                               |
| company-info        | ✅                       | ✅                        | ✅                            | ✅                               |
| team-members        | ✅                       | ✅                        | ✅                            | ✅                               |
| milestones          | ✅                       | ✅                        | ✅                            | ✅                               |
| service-features    | ✅                       | ✅                        | ✅                            | ✅                               |
| contact-submissions | ✅ 分页                  | -                        | ✅ 修改状态                   | -                               |
| site-config         | ✅                       | -                        | ✅ 批量更新                   | -                               |

---

## 五、前端改造方案

### 5.1 API 客户端封装

创建 `src/lib/api.ts` 统一封装 fetch 请求，添加：

- 请求/响应拦截
- 错误统一处理
- Base URL 环境变量配置
- TypeScript 类型定义

### 5.2 数据流改造

每个页面从静态数据改为 **useEffect + useState** 模式：

```typescript
// 改造前
const courses = [{...}, {...}]; // 静态数据

// 改造后
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  api.getCourses().then(data => {
    setCourses(data);
    setLoading(false);
  });
}, []);
```

### 5.3 Loading 与 Error 状态

每个数据加载区域添加：

- **Loading 态**：Skeleton 骨架屏
- **Error 态**：错误提示 + 重试按钮
- **Empty 态**：空数据提示

### 5.4 页面数据映射

| 页面          | 前端状态        | API 接口                                        |
| ------------- | --------------- | ----------------------------------------------- |
| 首页 Hero     | heroData        | `GET /api/site-config` + `GET /api/banners`     |
| 首页优势      | advantages      | `GET /api/advantages`                           |
| 首页课程      | homeCourses     | `GET /api/courses/home`                         |
| 首页 CTA      | ctaData         | `GET /api/site-config`                          |
| 关于我们-故事 | storyData       | `GET /api/company-info/story`                   |
| 关于我们-理念 | values          | `GET /api/company-info/values`                  |
| 关于我们-团队 | teamMembers     | `GET /api/team-members`                         |
| 关于我们-历程 | milestones      | `GET /api/milestones`                           |
| 产品服务-课程 | courses         | `GET /api/courses`                              |
| 产品服务-特色 | serviceFeatures | `GET /api/service-features`                     |
| 产品服务-路径 | learningPaths   | `GET /api/learning-paths`                       |
| 联系我们-信息 | contactInfo     | `GET /api/site-config`（phone/email/address等） |
| 联系我们-表单 | 提交逻辑        | `POST /api/contact-submissions`                 |

### 5.5 类型定义

创建 `src/types/api.ts`：

```typescript
// 统一响应格式
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 分页响应
export interface PageData<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// 各实体类型与后端 Entity 对应...
```

---

## 六、环境配置

### 6.1 后端 application.yml

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/vectorcat_db?useUnicode=true&characterEncoding=utf8mb4&serverTimezone=Asia/Shanghai
    username: root
    password: ${DB_PASSWORD:root}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5

mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-field: isActive
      logic-delete-value: 0
      logic-not-delete-value: 1

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

### 6.2 前端 .env

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 七、开发任务排期

| 阶段 | 任务                                            | 预估     |
| ---- | ----------------------------------------------- | -------- |
| 1    | 需求文档编写                                    | ✅ 当前   |
| 2    | 数据库建表 SQL + 初始化数据                     | 下一步   |
| 3    | Spring Boot 项目初始化 + 基础配置               | 下一步   |
| 4    | Entity + Mapper + Service + Controller 全量开发 | 下一步   |
| 5    | 前端改造对接后端 API                            | 下一步   |
| 6    | 联调测试                                        | 后续     |
| 7    | 管理后台开发                                    | 后续迭代 |

---

## 八、后续迭代计划

1. **管理后台**：React + Ant Design 开发 CMS 管理界面
2. **认证系统**：Spring Security + JWT 实现管理员登录
3. **图片上传**：课程封面图、团队成员头像上传
4. **数据统计**：预约转化率、访问量统计
5. **SEO 优化**：SSR / 预渲染
6. **国际化**：中英文双语支持
