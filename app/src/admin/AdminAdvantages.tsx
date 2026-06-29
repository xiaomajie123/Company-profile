import { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminAdvantage } from './types';

const defaultAdvantage: AdminAdvantage = {
  icon: '', title: '', description: '', sortOrder: 0, isActive: 1,
};

export default function AdminAdvantages() {
  const [items, setItems] = useState<AdminAdvantage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminAdvantage>(defaultAdvantage);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError('');
    adminApi.getAdvantages()
      .then(setItems)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultAdvantage });
    setDialogOpen(true);
  };

  const openEdit = (item: AdminAdvantage) => {
    setEditItem({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem.id) {
        await adminApi.updateAdvantage(editItem.id, editItem);
        toast.success('更新成功');
      } else {
        await adminApi.createAdvantage(editItem);
        toast.success('创建成功');
      }
      setDialogOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确认删除此项？')) return;
    try {
      await adminApi.deleteAdvantage(id);
      toast.success('删除成功');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">核心优势</h1>
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加优势</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchData}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无核心优势数据
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>图标</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-xl">{item.icon}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell>{item.sortOrder}</TableCell>
                  <TableCell>
                    <Switch checked={!!item.isActive} disabled />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => item.id && handleDelete(item.id)}>
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
            <DialogTitle>{editItem.id ? '编辑优势' : '添加优势'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>图标 (Emoji)</Label>
              <Input value={editItem.icon} onChange={(e) => setEditItem({ ...editItem, icon: e.target.value })} />
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
