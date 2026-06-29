import { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminMilestone } from './types';

const defaultMilestone: AdminMilestone = {
  year: '', title: '', description: '', sortOrder: 0, isActive: 1,
};

export default function AdminMilestones() {
  const [milestones, setMilestones] = useState<AdminMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminMilestone>(defaultMilestone);
  const [saving, setSaving] = useState(false);

  const fetchMilestones = () => {
    setLoading(true);
    setError('');
    adminApi.getMilestones()
      .then(setMilestones)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMilestones(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultMilestone });
    setDialogOpen(true);
  };

  const openEdit = (m: AdminMilestone) => {
    setEditItem({ ...m });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem.id) {
        await adminApi.updateMilestone(editItem.id, editItem);
        toast.success('更新成功');
      } else {
        await adminApi.createMilestone(editItem);
        toast.success('创建成功');
      }
      setDialogOpen(false);
      fetchMilestones();
    } catch (err: any) {
      toast.error(err.message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确认删除此项？')) return;
    try {
      await adminApi.deleteMilestone(id);
      toast.success('删除成功');
      fetchMilestones();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">发展历程</h1>
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加里程碑</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchMilestones}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && milestones.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无里程碑数据
        </div>
      )}

      {!loading && !error && milestones.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>年份</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.year}</TableCell>
                  <TableCell>{m.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{m.description}</TableCell>
                  <TableCell>{m.sortOrder}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(m)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => m.id && handleDelete(m.id)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editItem.id ? '编辑里程碑' : '添加里程碑'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>年份</Label>
              <Input value={editItem.year} onChange={(e) => setEditItem({ ...editItem, year: e.target.value })} />
            </div>
            <div>
              <Label>标题</Label>
              <Input value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} />
            </div>
            <div>
              <Label>描述</Label>
              <Textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} />
            </div>
            <div>
              <Label>排序</Label>
              <Input type="number" value={editItem.sortOrder} onChange={(e) => setEditItem({ ...editItem, sortOrder: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!editItem.isActive} onCheckedChange={(v) => setEditItem({ ...editItem, isActive: v ? 1 : 0 })} />
              <Label>启用</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Spinner />} 保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
