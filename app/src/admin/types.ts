export interface AdminCourse {
  id?: number;
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
  isActive: number;
  isShowHome: number;
  features?: AdminCourseFeature[];
  levels?: AdminCourseLevel[];
}

export interface AdminCourseFeature {
  id?: number;
  courseId?: number;
  content: string;
  sortOrder: number;
}

export interface AdminCourseLevel {
  id?: number;
  courseId?: number;
  name: string;
  sortOrder: number;
}

export interface AdminTeamMember {
  id?: number;
  name: string;
  title: string;
  description: string;
  avatar: string;
  sortOrder: number;
  isActive: number;
}

export interface AdminMilestone {
  id?: number;
  year: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: number;
}

export interface AdminAdvantage {
  id?: number;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: number;
}

export interface AdminServiceFeature {
  id?: number;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  isActive: number;
}

export interface AdminLearningPath {
  id?: number;
  stepNumber: string;
  title: string;
  ageRange: string;
  icon: string;
  sortOrder: number;
  isActive: number;
}

export interface AdminConfigItem {
  id: number;
  configKey: string;
  configValue: string;
  configType: string;
  description: string;
}

export interface AdminContact {
  id: number;
  parentName: string;
  phone: string;
  childAge: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  totalCourses: number;
  totalTeamMembers: number;
  totalMilestones: number;
  pendingContacts: number;
  totalContacts: number;
  contactedContacts: number;
}

export interface PageData<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
