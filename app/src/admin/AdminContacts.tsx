import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Check, PhoneCall, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminContact, PageData } from './types';

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: '待处理', variant: 'outline' },
  contacted: { label: '已联系', variant: 'secondary' },
  converted: { label: '已转化', variant: 'default' },
  invalid: { label: '无效', variant: 'destructive' },
};

export default function AdminContacts() {
  const [data, setData] = useState<PageData<AdminContact> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchContacts = () => {
    setLoading(true);
    setError('');
    adminApi.getContacts(page, 10)
      .then(setData)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, [page]);

  const handleStatusChange = async (id: number, status: string) => {
    setActionLoading(id);
    try {
      await adminApi.updateContactStatus(id, status);
      toast.success('状态已更新');
      fetchContacts();
    } catch (err: any) {
      toast.error(err.message || '操作失败');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确认删除此预约？')) return;
    setActionLoading(id);
    try {
      await adminApi.deleteContact(id);
      toast.success('已删除');
      fetchContacts();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    } finally {
      setActionLoading(null);
    }
  };

  const contacts = data?.records || [];
  const filtered = statusFilter === 'all'
    ? contacts
    : contacts.filter((c) => c.status === statusFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">预约管理</h1>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="全部状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待处理</SelectItem>
              <SelectItem value="contacted">已联系</SelectItem>
              <SelectItem value="converted">已转化</SelectItem>
              <SelectItem value="invalid">无效</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={fetchContacts}>
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchContacts}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {contacts.length === 0 ? '暂无预约数据' : '未找到匹配的记录'}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>姓名</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>年龄</TableHead>
                  <TableHead>留言</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => {
                  const s = statusMap[c.status] || { label: c.status, variant: 'outline' as const };
                  const isBusy = actionLoading === c.id;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.parentName}</TableCell>
                      <TableCell>{c.phone}</TableCell>
                      <TableCell>{c.childAge}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{c.message}</TableCell>
                      <TableCell>
                        <Badge variant={s.variant}>{s.label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString('zh-CN') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {c.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleStatusChange(c.id, 'contacted')}
                              disabled={isBusy}
                              title="标记已联系"
                            >
                              {isBusy ? <Spinner /> : <PhoneCall className="size-4" />}
                            </Button>
                          )}
                          {(c.status === 'pending' || c.status === 'contacted') && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleStatusChange(c.id, 'converted')}
                              disabled={isBusy}
                              title="标记已转化"
                            >
                              <Check className="size-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(c.id)}
                            disabled={isBusy}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">
                共 {data.total} 条记录，第 {data.current}/{data.pages} 页
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="size-4" /> 上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= data.pages}
                >
                  下一页 <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
