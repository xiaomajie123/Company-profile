// ==========================================
// 矢量猫科技 API 类型定义
// ==========================================

// 统一响应
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// ==========================================
// 实体类型（与后端 Java Entity 对应）
// ==========================================

export interface Advantage {
  id: number;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface Course {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  ageRange: string;
  minAge: number;
  maxAge: number;
  icon: string;
  colorClass: string;
  borderColor: string;
  bgColor: string;
  duration: string;
  sortOrder: number;
  features: CourseFeature[];
  levels: CourseLevel[];
}

export interface CourseFeature {
  id: number;
  courseId: number;
  content: string;
  sortOrder: number;
}

export interface CourseLevel {
  id: number;
  courseId: number;
  name: string;
  sortOrder: number;
}

export interface LearningPath {
  id: number;
  stepNumber: string;
  title: string;
  ageRange: string;
  icon: string;
  sortOrder: number;
}

export interface CompanyInfo {
  id: number;
  infoType: 'story' | 'value';
  title: string;
  icon: string;
  content: string;
  description: string;
  paragraphOrder: number;
  sortOrder: number;
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  avatar: string;
  avatarUrl: string;
  sortOrder: number;
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface ServiceFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface ContactFormData {
  parentName: string;
  phone: string;
  childAge: string;
  message: string;
}

// Site config is a flat key-value map
export type SiteConfig = Record<string, string>;

// Company info grouped
export interface CompanyInfoGrouped {
  story: CompanyInfo[];
  values: CompanyInfo[];
}
