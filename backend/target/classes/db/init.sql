-- ============================================
-- 矢量猫科技企业官网 数据库初始化脚本
-- 数据库名: vectorcat_db
-- 字符集: utf8mb4
-- ============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `vectorcat_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `vectorcat_db`;

-- ============================================
-- 1. 站点全局配置表
-- ============================================
DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `config_key` VARCHAR(50) NOT NULL COMMENT '配置键',
  `config_value` TEXT NOT NULL COMMENT '配置值',
  `config_type` VARCHAR(20) DEFAULT 'text' COMMENT '值类型(text/json/image)',
  `description` VARCHAR(200) DEFAULT NULL COMMENT '配置说明',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='站点全局配置表';

-- ============================================
-- 2. Banner 横幅配置表
-- ============================================
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` VARCHAR(100) NOT NULL COMMENT '标题',
  `subtitle` VARCHAR(200) DEFAULT NULL COMMENT '副标题',
  `image_url` VARCHAR(500) DEFAULT NULL COMMENT '图片地址',
  `link_url` VARCHAR(500) DEFAULT NULL COMMENT '链接地址',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Banner横幅配置表';

-- ============================================
-- 3. 核心优势表
-- ============================================
DROP TABLE IF EXISTS `advantage`;
CREATE TABLE `advantage` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `icon` VARCHAR(50) NOT NULL COMMENT '图标标识(SVG path key)',
  `title` VARCHAR(50) NOT NULL COMMENT '标题',
  `description` VARCHAR(200) NOT NULL COMMENT '描述',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='核心优势表';

-- ============================================
-- 4. 课程信息表
-- ============================================
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` VARCHAR(100) NOT NULL COMMENT '课程名称',
  `subtitle` VARCHAR(100) DEFAULT NULL COMMENT '副标题',
  `description` TEXT COMMENT '课程描述',
  `age_range` VARCHAR(20) DEFAULT NULL COMMENT '适合年龄段',
  `min_age` INT DEFAULT NULL COMMENT '最小年龄',
  `max_age` INT DEFAULT NULL COMMENT '最大年龄',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '图标标识',
  `color_class` VARCHAR(50) DEFAULT NULL COMMENT 'Tailwind颜色样式类',
  `border_color` VARCHAR(50) DEFAULT NULL COMMENT '边框颜色(如: border-l-amber-500)',
  `bg_color` VARCHAR(50) DEFAULT NULL COMMENT '背景色(如: bg-amber-50)',
  `duration` VARCHAR(50) DEFAULT NULL COMMENT '课时安排',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `is_show_home` TINYINT(1) DEFAULT 1 COMMENT '是否首页展示(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程信息表';

-- ============================================
-- 5. 课程特色表
-- ============================================
DROP TABLE IF EXISTS `course_feature`;
CREATE TABLE `course_feature` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `course_id` BIGINT NOT NULL COMMENT '所属课程ID',
  `content` VARCHAR(200) NOT NULL COMMENT '特色描述内容',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_course_id` (`course_id`),
  CONSTRAINT `fk_feature_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程特色表';

-- ============================================
-- 6. 课程级别表
-- ============================================
DROP TABLE IF EXISTS `course_level`;
CREATE TABLE `course_level` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `course_id` BIGINT NOT NULL COMMENT '所属课程ID',
  `name` VARCHAR(50) NOT NULL COMMENT '级别名称',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_course_id` (`course_id`),
  CONSTRAINT `fk_level_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='课程级别表';

-- ============================================
-- 7. 学习路径表
-- ============================================
DROP TABLE IF EXISTS `learning_path`;
CREATE TABLE `learning_path` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `step_number` VARCHAR(10) NOT NULL COMMENT '步骤编号(如:01)',
  `title` VARCHAR(50) NOT NULL COMMENT '步骤标题',
  `age_range` VARCHAR(20) DEFAULT NULL COMMENT '年龄段',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '图标',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学习路径表';

-- ============================================
-- 8. 公司信息 / 教育理念表
-- ============================================
DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `info_type` VARCHAR(30) NOT NULL COMMENT '信息类型(story/value)',
  `title` VARCHAR(100) NOT NULL COMMENT '标题',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '图标(value类型用)',
  `content` TEXT COMMENT '内容(story类型用)',
  `description` VARCHAR(200) DEFAULT NULL COMMENT '描述(value类型用)',
  `paragraph_order` INT DEFAULT NULL COMMENT '段落顺序(story类型)',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_type_active` (`info_type`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公司信息/教育理念表';

-- ============================================
-- 9. 团队成员表
-- ============================================
DROP TABLE IF EXISTS `team_member`;
CREATE TABLE `team_member` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` VARCHAR(30) NOT NULL COMMENT '姓名',
  `title` VARCHAR(50) NOT NULL COMMENT '职位',
  `description` VARCHAR(200) DEFAULT NULL COMMENT '简介',
  `avatar` VARCHAR(50) DEFAULT NULL COMMENT '头像图标(emoji)',
  `avatar_url` VARCHAR(500) DEFAULT NULL COMMENT '头像图片URL',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='团队成员表';

-- ============================================
-- 10. 发展历程表
-- ============================================
DROP TABLE IF EXISTS `milestone`;
CREATE TABLE `milestone` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `year` VARCHAR(10) NOT NULL COMMENT '年份',
  `title` VARCHAR(100) NOT NULL COMMENT '标题',
  `description` VARCHAR(200) DEFAULT NULL COMMENT '描述',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='发展历程表';

-- ============================================
-- 11. 教学服务特色表
-- ============================================
DROP TABLE IF EXISTS `service_feature`;
CREATE TABLE `service_feature` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `icon` VARCHAR(50) NOT NULL COMMENT '图标',
  `title` VARCHAR(50) NOT NULL COMMENT '标题',
  `description` VARCHAR(200) NOT NULL COMMENT '描述',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT '是否启用(1:是 0:否)',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_active` (`sort_order`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教学服务特色表';

-- ============================================
-- 12. 预约试听提交表
-- ============================================
DROP TABLE IF EXISTS `contact_submission`;
CREATE TABLE `contact_submission` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_name` VARCHAR(30) NOT NULL COMMENT '家长姓名',
  `phone` VARCHAR(20) NOT NULL COMMENT '联系电话',
  `child_age` VARCHAR(20) DEFAULT NULL COMMENT '孩子年龄段',
  `message` TEXT COMMENT '留言',
  `status` VARCHAR(20) DEFAULT 'pending' COMMENT '处理状态(pending/contacted/converted/invalid)',
  `remark` VARCHAR(500) DEFAULT NULL COMMENT '管理员备注',
  `ip_address` VARCHAR(50) DEFAULT NULL COMMENT '提交IP地址',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='预约试听提交表';

-- ============================================
-- 初始化数据
-- ============================================

-- 站点配置初始数据
INSERT INTO `site_config` (`config_key`, `config_value`, `config_type`, `description`) VALUES
('company_name', '重庆矢量猫科技有限公司', 'text', '公司名称'),
('company_name_en', 'VectorCat Tech', 'text', '公司英文名'),
('phone', '400-XXX-XXXX', 'text', '联系电话'),
('email', 'contact@vectorcat.cn', 'text', '联系邮箱'),
('address', '重庆市渝北区XXXX路XX号', 'text', '公司地址'),
('business_hours', '周一至周日 9:00 - 21:00', 'text', '营业时间'),
('hero_badge', '2025 暑期班火热报名中', 'text', 'Hero角标文本'),
('hero_title_1', '用编程', 'text', 'Hero主标题第1行'),
('hero_title_2', '开启孩子的', 'text', 'Hero主标题第2行'),
('hero_title_3', '未来创造力', 'text', 'Hero主标题第3行'),
('hero_subtitle', '重庆矢量猫科技，专注6-16岁青少年编程教育。我们不只是教编程，更是在培养孩子的计算思维、解决问题的能力和面向未来的竞争力。', 'text', 'Hero副标题'),
('cta_primary', '预约免费试听', 'text', '主CTA按钮文字'),
('cta_secondary', '了解课程体系', 'text', '次CTA按钮文字'),
('stats_students', '500+', 'text', '统计-在读学员'),
('stats_students_label', '在读学员', 'text', '统计-在读学员标签'),
('stats_renewal', '96%', 'text', '统计-续课率'),
('stats_renewal_label', '续课率', 'text', '统计-续课率标签'),
('stats_awards', '200+', 'text', '统计-竞赛获奖'),
('stats_awards_label', '竞赛获奖', 'text', '统计-竞赛获奖标签'),
('home_advantages_title', '为什么选择矢量猫？', 'text', '首页优势区域标题'),
('home_advantages_subtitle', '我们用心打磨每一堂课，让孩子在快乐中学会创造', 'text', '首页优势区域副标题'),
('home_courses_title', '分龄课程体系', 'text', '首页课程区域标题'),
('home_courses_subtitle', '科学分级，因材施教，为每个年龄段的孩子提供最适合的编程课程', 'text', '首页课程区域副标题'),
('cta_section_title', '让孩子领先一步，从第一行代码开始', 'text', 'CTA区域标题'),
('cta_section_subtitle', '现在预约，即可获得免费编程能力测评 + 体验课一节', 'text', 'CTA区域副标题'),
('about_page_title', '关于矢量猫科技', 'text', '关于我们页标题'),
('about_page_subtitle', '我们是一家充满热情与创造力的少儿编程教育公司，用科技的力量点燃孩子的想象力，培养面向未来的数字公民', 'text', '关于我们页副标题'),
('about_story_title', '从热爱到使命', 'text', '公司故事标题'),
('about_values_title', '我们的教育理念', 'text', '教育理念标题'),
('about_values_subtitle', '用正确的理念，做正确的教育', 'text', '教育理念副标题'),
('about_team_title', '核心教学团队', 'text', '团队标题'),
('about_team_subtitle', '来自名校、热爱教育、精通编程的专业师资', 'text', '团队副标题'),
('about_milestone_title', '发展历程', 'text', '里程碑标题'),
('about_milestone_subtitle', '每一步，都走得扎实', 'text', '里程碑副标题'),
('services_page_title', '产品服务体系', 'text', '服务页标题'),
('services_page_subtitle', '科学的课程体系，专业的教学服务，让每个阶段的孩子都能找到最适合的编程课', 'text', '服务页副标题'),
('services_feature_title', '教学服务特色', 'text', '服务特色标题'),
('services_feature_subtitle', '不止于课堂，我们提供全方位的教学服务保障', 'text', '服务特色副标题'),
('services_path_title', '学习成长路径', 'text', '学习路径标题'),
('services_path_subtitle', '从入门到竞赛，一条清晰的编程成长路线', 'text', '学习路径副标题'),
('contact_page_title', '联系我们', 'text', '联系页标题'),
('contact_page_subtitle', '预约免费试听课，为孩子开启编程世界的大门', 'text', '联系页副标题'),
('contact_form_title', '预约免费试听', 'text', '联系表单标题'),
('contact_form_subtitle', '填写以下信息，我们将为您安排免费的编程能力测评和体验课', 'text', '联系表单副标题'),
('contact_info_title', '联系方式', 'text', '联系信息标题'),
('contact_info_subtitle', '您也可以通过以下方式直接联系我们', 'text', '联系信息副标题'),
('footer_description', '重庆矢量猫科技有限公司，专注于6-16岁青少年编程教育，致力于用科技点亮孩子的未来。', 'text', '页脚公司简介'),
('copyright', '© 2025 重庆矢量猫科技有限公司 | 渝ICP备XXXXXXXX号 | 版权所有', 'text', '版权信息');

-- 核心优势初始数据
INSERT INTO `advantage` (`icon`, `title`, `description`, `sort_order`) VALUES
('academic', '专业课程体系', '对标国际 CSTA 标准，自主研发分龄课程，覆盖6-16岁全阶段', 1),
('teacher', '名师团队授课', '985/211 名校背景教师，小班制教学，关注每位学员成长', 2),
('project', '趣味项目实践', '游戏化教学+真实项目开发，激发孩子创造力与编程兴趣', 3),
('award', '竞赛成果斐然', '蓝桥杯、NOC 等权威赛事获奖学员超200人次，通过率行业领先', 4);

-- 课程初始数据
INSERT INTO `course` (`name`, `subtitle`, `description`, `age_range`, `min_age`, `max_age`, `icon`, `color_class`, `border_color`, `bg_color`, `duration`, `sort_order`, `is_show_home`) VALUES
('Scratch 创意启蒙', '编程启蒙，从兴趣开始', '专为零基础低龄学员设计，通过拖拽式图形化编程，让孩子在创作动画、故事和小游戏中培养计算思维和逻辑能力。', '6-8岁', 6, 8, '🧩', 'from-amber-400 to-orange-500', 'border-l-amber-500', 'bg-amber-50', '每期32课时 / 每周2课时', 1, 1),
('Python 进阶编程', '从积木到代码的跨越', '从图形化编程平稳过渡到代码编程，系统学习 Python 语言基础，通过趣味项目掌握变量、循环、函数等核心概念。', '8-12岁', 8, 12, '🐍', 'from-blue-400 to-indigo-500', 'border-l-blue-500', 'bg-blue-50', '每期36课时 / 每周2课时', 2, 1),
('机器人编程', '软硬结合，手脑并用', '结合 micro:bit / Arduino 等硬件平台，学习传感器原理、电机控制和自动化逻辑，用代码操控真实世界的设备。', '10-14岁', 10, 14, '🤖', 'from-emerald-400 to-teal-500', 'border-l-emerald-500', 'bg-emerald-50', '每期36课时 / 每周2课时', 3, 1),
('信息学奥赛特训', '冲刺权威竞赛，助力升学', '面向有一定编程基础的学员，系统学习 C++ 语言、数据结构与算法，备战蓝桥杯、NOIP、CSP-J/S 等权威赛事。', '12-16岁', 12, 16, '🏅', 'from-purple-400 to-violet-500', 'border-l-violet-500', 'bg-violet-50', '每期48课时 / 每周3课时', 4, 1);

-- 课程特色初始数据 (course_id 对应上面 INSERT 的顺序: 1=Scratch, 2=Python, 3=机器人, 4=信息学奥赛)
INSERT INTO `course_feature` (`course_id`, `content`, `sort_order`) VALUES
(1, '图形化积木式编程，无需打字即可编程', 1),
(1, '每节课完成一个趣味作品（动画/游戏/故事）', 2),
(1, '融入数学、美术、音乐等跨学科知识', 3),
(1, '培养逻辑思维、创造力和表达能力', 4),
(2, '从 Scratch 到 Python 的无缝衔接路径', 1),
(2, '游戏化项目驱动教学（猜数字、贪吃蛇等）', 2),
(2, '引入 Turtle 绘图库，可视化学习成果', 3),
(2, '培养代码调试能力和工程思维', 4),
(3, 'micro:bit / Arduino 真实硬件编程', 1),
(3, '传感器数据采集与处理', 2),
(3, '智能小车、机械臂等实物项目搭建', 3),
(3, '培养动手能力与工程实践能力', 4),
(4, 'C++ 语言精讲+STL 标准库应用', 1),
(4, '核心算法专题（排序、搜索、动态规划等）', 2),
(4, '历年真题精练+模拟赛训练', 3),
(4, '金牌教练一对一指导备赛策略', 4);

-- 课程级别初始数据
INSERT INTO `course_level` (`course_id`, `name`, `sort_order`) VALUES
(1, '启蒙班', 1),
(1, '基础班', 2),
(1, '进阶班', 3),
(2, '基础班', 1),
(2, '提升班', 2),
(2, '项目实战班', 3),
(3, '入门班', 1),
(3, '创意班', 2),
(3, '竞赛班', 3),
(4, '初级班', 1),
(4, '提高班', 2),
(4, '冲刺班', 3);

-- 学习路径初始数据
INSERT INTO `learning_path` (`step_number`, `title`, `age_range`, `icon`, `sort_order`) VALUES
('01', 'Scratch 启蒙', '6-8岁', '🧩', 1),
('02', 'Python 进阶', '8-12岁', '🐍', 2),
('03', '机器人编程', '10-14岁', '🤖', 3),
('04', '信息学奥赛', '12-16岁', '🏅', 4);

-- 公司信息 - 公司故事（段落）
INSERT INTO `company_info` (`info_type`, `title`, `content`, `paragraph_order`, `sort_order`) VALUES
('story', '段落1', '重庆矢量猫科技有限公司成立于2019年，由一群热爱编程、热爱教育的年轻人创立。我们深知，在人工智能时代，编程不再是一项专业技能，而是每个人都应该具备的基础素养。', 1, 1),
('story', '段落2', '公司名称"矢量猫"蕴含着我们的教育理念：矢量代表着方向和力量，猫代表着好奇心和探索精神。我们希望每个孩子都能像小猫一样，对世界充满好奇，用编程这个工具去探索、去创造。', 2, 2),
('story', '段落3', '经过多年发展，我们已经建立起一套科学完善的少儿编程课程体系，培养了一支高素质的教学团队，赢得了家长和学员的广泛认可。', 3, 3);

-- 公司信息 - 教育理念
INSERT INTO `company_info` (`info_type`, `title`, `icon`, `description`, `sort_order`) VALUES
('value', '以孩子为中心', '🎯', '尊重每个孩子的学习节奏，用最适合的方式激发潜能', 1),
('value', '创新驱动教学', '🌟', '持续迭代课程内容，将最新的教育理念和技术融入课堂', 2),
('value', '家校共育', '🤝', '定期家长会+学习报告，让家长全程参与孩子的成长', 3),
('value', '长期主义', '💪', '不追求速成，专注培养终身受用的编程思维与学习能力', 4);

-- 团队成员初始数据
INSERT INTO `team_member` (`name`, `title`, `description`, `avatar`, `sort_order`) VALUES
('张老师', '教学总监', '北航计算机硕士，10年少儿编程教学经验', '👨‍🏫', 1),
('李老师', 'Python课程组长', '重大计算机学士，ACM竞赛区域赛金奖', '👩‍🏫', 2),
('王老师', 'Scratch课程组长', '学前教育+计算机双背景，擅长游戏化教学', '👨‍🎓', 3),
('陈老师', '竞赛教练', 'NOI金牌教练，指导学生获蓝桥杯国赛一等奖', '👩‍💻', 4);

-- 发展历程初始数据
INSERT INTO `milestone` (`year`, `title`, `description`, `sort_order`) VALUES
('2019', '梦想启航', '矢量猫科技在重庆正式成立，首期招收学员30人', 1),
('2020', '课程研发', '完成 Scratch-Python-C++ 三级课程体系研发', 2),
('2021', '规模拓展', '学员突破200人，开设第二教学中心', 3),
('2022', '竞赛突破', '学员首获蓝桥杯全国一等奖，累计获奖超100人次', 4),
('2023', '品牌升级', '获评"重庆市优秀教育机构"，在读学员超500人', 5),
('2024', '持续成长', '推出机器人编程课程，打造OMO线上线下融合教学', 6);

-- 教学服务特色初始数据
INSERT INTO `service_feature` (`icon`, `title`, `description`, `sort_order`) VALUES
('👥', '小班教学', '每班不超过8人，确保每位学员得到充分关注', 1),
('📊', '学习报告', '每次课后生成详细学习反馈，家长随时了解进度', 2),
('🎮', '项目驱动', '每阶段完成一个完整项目，结业可获得作品集', 3),
('🌐', '线上线下融合', '线下面授+线上练习平台，灵活高效的学习体验', 4),
('📝', '阶段测评', '定期能力评估，科学调整学习计划', 5),
('🏆', '赛事通道', '直通蓝桥杯、NOC等官方赛事，全程备赛辅导', 6);
