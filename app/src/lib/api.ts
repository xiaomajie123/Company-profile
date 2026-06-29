// ==========================================
// 矢量猫科技 API 客户端
// ==========================================

import type {
  ApiResponse,
  Advantage,
  Course,
  LearningPath,
  CompanyInfo,
  CompanyInfoGrouped,
  TeamMember,
  Milestone,
  ServiceFeature,
  ContactFormData,
  SiteConfig,
} from '@/types/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiError extends Error {
  status: number;
  code: number;

  constructor(status: number, code: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const json: ApiResponse<T> = await res.json().catch(() => ({
    code: res.status,
    message: '网络请求失败',
    data: null as T,
  }));

  if (!res.ok || json.code !== 200) {
    throw new ApiError(res.status, json.code, json.message || '请求失败');
  }

  return json.data;
}

// ==========================================
// API 方法
// ==========================================

export const api = {
  // 站点配置
  getSiteConfig: () => request<SiteConfig>('/site-config'),

  // 核心优势
  getAdvantages: () => request<Advantage[]>('/advantages'),

  // 课程
  getCourses: () => request<Course[]>('/courses'),
  getHomeCourses: () => request<Course[]>('/courses/home'),
  getCourse: (id: number) => request<Course>(`/courses/${id}`),

  // 学习路径
  getLearningPaths: () => request<LearningPath[]>('/learning-paths'),

  // 公司信息
  getCompanyInfo: () => request<CompanyInfoGrouped>('/company-info'),
  getCompanyStory: () => request<CompanyInfo[]>('/company-info/story'),
  getCompanyValues: () => request<CompanyInfo[]>('/company-info/values'),

  // 团队
  getTeamMembers: () => request<TeamMember[]>('/team-members'),

  // 里程碑
  getMilestones: () => request<Milestone[]>('/milestones'),

  // 教学服务特色
  getServiceFeatures: () => request<ServiceFeature[]>('/service-features'),

  // 预约提交
  submitContact: (data: ContactFormData) =>
    request<string>('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export { ApiError };
