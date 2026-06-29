import { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Pencil, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminTeamMember } from './types';

const defaultMember: AdminTeamMember = {
  name: '', title: '', description: '', avatar: '', sortOrder: 0, isActive: 1,
};

export default function AdminTeam() {
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminTeamMember>(defaultMember);
  const [saving, setSaving] = useState(false);

  const fetchMembers = () => {
    setLoading(true);
    setError('');
    adminApi.getTeamMembers()
      .then(setMembers)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMembers(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultMember });
    setDialogOpen(true);
  };

  const openEdit = (m: AdminTeamMember) => {
    setEditItem({ ...m });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem.id) {
        await adminApi.updateTeamMember(editItem.id, editItem);
        toast.success('更新成功');
      } else {
        await adminApi.createTeamMember(editItem);
        toast.success('创建成功');
      }
      setDialogOpen(false);
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确认删除此成员？')) return;
    try {
      await adminApi.deleteTeamMember(id);
      toast.success('删除成功');
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">团队成员</h1>
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加成员</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchMembers}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无团队成员
        </div>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((m) => (
            <Card key={m.id}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                  {m.avatar || <User className="size-8 text-primary" />}
                </div>
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{m.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{m.description}</p>
                <div className="flex justify-center gap-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => openEdit(m)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => m.id && handleDelete(m.id)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editItem.id ? '编辑成员' : '添加成员'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>姓名</Label>
              <Input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
            </div>
            <div>
              <Label>职位</Label>
              <Input value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} />
            </div>
            <div>
              <Label>描述</Label>
              <Textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} />
            </div>
            <div>
              <Label>头像 (Emoji)</Label>
              <Input value={editItem.avatar} onChange={(e) => setEditItem({ ...editItem, avatar: e.target.value })} />
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
