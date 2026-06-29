import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { adminApi } from './AdminApi';
import type { DashboardStats } from './types';
import {
  BookOpen, Users, Milestone, MessageSquare, Clock, CheckCircle,
} from 'lucide-react';

const statCards = [
  { key: 'totalCourses', label: '课程总数', icon: BookOpen, color: 'bg-blue-500' },
  { key: 'totalTeamMembers', label: '团队成员', icon: Users, color: 'bg-green-500' },
  { key: 'totalMilestones', label: '发展历程', icon: Milestone, color: 'bg-purple-500' },
  { key: 'totalContacts', label: '预约总数', icon: MessageSquare, color: 'bg-orange-500' },
  { key: 'pendingContacts', label: '待处理预约', icon: Clock, color: 'bg-yellow-500' },
  { key: 'contactedContacts', label: '已联系', icon: CheckCircle, color: 'bg-teal-500' },
] as const;

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = () => {
    setLoading(true);
    setError('');
    adminApi.getStats()
      .then(setStats)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchStats}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map(({ key, label, icon: Icon, color }) => (
            <Card key={key}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
                  <Icon className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{stats[key as keyof DashboardStats]}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && !stats && (
        <div className="text-center py-12 text-muted-foreground">
          暂无数据
        </div>
      )}
    </div>
  );
}
