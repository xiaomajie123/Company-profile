import type { ApiResponse } from '@/types/api';
import type {
  AdminCourse, AdminTeamMember, AdminMilestone, AdminAdvantage,
  AdminServiceFeature, AdminLearningPath, AdminConfigItem, AdminContact,
  DashboardStats, PageData,
} from './types';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function getToken(): string {
  return localStorage.getItem('admin_token') || '';
}

async function adminRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/admin${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
    throw new Error('未登录');
  }
  const json: ApiResponse<T> = await res.json();
  if (!res.ok || json.code !== 200) throw new Error(json.message || '请求失败');
  return json.data;
}

export const adminApi = {
  login: (username: string, password: string) =>
    fetch(`${BASE}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(r => r.json()),

  getStats: () => adminRequest<DashboardStats>('/dashboard/stats'),

  getCourses: () => adminRequest<AdminCourse[]>('/courses'),
  createCourse: (data: AdminCourse) => adminRequest<AdminCourse>('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id: number, data: AdminCourse) => adminRequest<AdminCourse>(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id: number) => adminRequest<string>(`/courses/${id}`, { method: 'DELETE' }),

  getTeamMembers: () => adminRequest<AdminTeamMember[]>('/team-members'),
  createTeamMember: (data: AdminTeamMember) => adminRequest<AdminTeamMember>('/team-members', { method: 'POST', body: JSON.stringify(data) }),
  updateTeamMember: (id: number, data: AdminTeamMember) => adminRequest<AdminTeamMember>(`/team-members/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTeamMember: (id: number) => adminRequest<string>(`/team-members/${id}`, { method: 'DELETE' }),

  getMilestones: () => adminRequest<AdminMilestone[]>('/milestones'),
  createMilestone: (data: AdminMilestone) => adminRequest<AdminMilestone>('/milestones', { method: 'POST', body: JSON.stringify(data) }),
  updateMilestone: (id: number, data: AdminMilestone) => adminRequest<AdminMilestone>(`/milestones/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMilestone: (id: number) => adminRequest<string>(`/milestones/${id}`, { method: 'DELETE' }),

  getAdvantages: () => adminRequest<AdminAdvantage[]>('/advantages'),
  createAdvantage: (data: AdminAdvantage) => adminRequest<AdminAdvantage>('/advantages', { method: 'POST', body: JSON.stringify(data) }),
  updateAdvantage: (id: number, data: AdminAdvantage) => adminRequest<AdminAdvantage>(`/advantages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdvantage: (id: number) => adminRequest<string>(`/advantages/${id}`, { method: 'DELETE' }),

  getServiceFeatures: () => adminRequest<AdminServiceFeature[]>('/service-features'),
  createServiceFeature: (data: AdminServiceFeature) => adminRequest<AdminServiceFeature>('/service-features', { method: 'POST', body: JSON.stringify(data) }),
  updateServiceFeature: (id: number, data: AdminServiceFeature) => adminRequest<AdminServiceFeature>(`/service-features/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteServiceFeature: (id: number) => adminRequest<string>(`/service-features/${id}`, { method: 'DELETE' }),

  getLearningPaths: () => adminRequest<AdminLearningPath[]>('/learning-paths'),
  createLearningPath: (data: AdminLearningPath) => adminRequest<AdminLearningPath>('/learning-paths', { method: 'POST', body: JSON.stringify(data) }),
  updateLearningPath: (id: number, data: AdminLearningPath) => adminRequest<AdminLearningPath>(`/learning-paths/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteLearningPath: (id: number) => adminRequest<string>(`/learning-paths/${id}`, { method: 'DELETE' }),

  getConfigs: () => adminRequest<AdminConfigItem[]>('/site-config'),
  updateConfig: (key: string, value: string) =>
    adminRequest<string>(`/site-config/${key}`, { method: 'PUT', body: JSON.stringify({ configValue: value }) }),

  getContacts: (page = 1, size = 10) => adminRequest<PageData<AdminContact>>(`/contact-submissions?page=${page}&size=${size}`),
  updateContactStatus: (id: number, status: string) =>
    adminRequest<string>(`/contact-submissions/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteContact: (id: number) => adminRequest<string>(`/contact-submissions/${id}`, { method: 'DELETE' }),

  isLoggedIn: () => !!getToken(),
  logout: () => localStorage.removeItem('admin_token'),
};
