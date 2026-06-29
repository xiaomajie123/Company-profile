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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminServiceFeature, AdminLearningPath } from './types';

const defaultFeature: AdminServiceFeature = {
  icon: '', title: '', description: '', sortOrder: 0, isActive: 1,
};

const defaultPath: AdminLearningPath = {
  stepNumber: '', title: '', ageRange: '', icon: '', sortOrder: 0, isActive: 1,
};

function ServiceFeaturesTab() {
  const [items, setItems] = useState<AdminServiceFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminServiceFeature>(defaultFeature);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError('');
    adminApi.getServiceFeatures()
      .then(setItems)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultFeature });
    setDialogOpen(true);
  };

  const openEdit = (item: AdminServiceFeature) => {
    setEditItem({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem.id) {
        await adminApi.updateServiceFeature(editItem.id, editItem);
        toast.success('更新成功');
      } else {
        await adminApi.createServiceFeature(editItem);
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
      await adminApi.deleteServiceFeature(id);
      toast.success('删除成功');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加特色</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchData}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无教学特色数据
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
            <DialogTitle>{editItem.id ? '编辑教学特色' : '添加教学特色'}</DialogTitle>
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

function LearningPathsTab() {
  const [items, setItems] = useState<AdminLearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminLearningPath>(defaultPath);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError('');
    adminApi.getLearningPaths()
      .then(setItems)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultPath });
    setDialogOpen(true);
  };

  const openEdit = (item: AdminLearningPath) => {
    setEditItem({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem.id) {
        await adminApi.updateLearningPath(editItem.id, editItem);
        toast.success('更新成功');
      } else {
        await adminApi.createLearningPath(editItem);
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
      await adminApi.deleteLearningPath(id);
      toast.success('删除成功');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加路径</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchData}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无学习路径数据
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>步骤</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>年龄段</TableHead>
                <TableHead>图标</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.stepNumber}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.ageRange}</TableCell>
                  <TableCell className="text-xl">{item.icon}</TableCell>
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
            <DialogTitle>{editItem.id ? '编辑学习路径' : '添加学习路径'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label>步骤编号</Label>
              <Input value={editItem.stepNumber} onChange={(e) => setEditItem({ ...editItem, stepNumber: e.target.value })} />
            </div>
            <div>
              <Label>标题</Label>
              <Input value={editItem.title} onChange={(e) => setEditItem({ ...editItem, title: e.target.value })} />
            </div>
            <div>
              <Label>年龄段</Label>
              <Input value={editItem.ageRange} onChange={(e) => setEditItem({ ...editItem, ageRange: e.target.value })} />
            </div>
            <div>
              <Label>图标 (Emoji)</Label>
              <Input value={editItem.icon} onChange={(e) => setEditItem({ ...editItem, icon: e.target.value })} />
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

export default function AdminFeatures() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">教学特色 & 学习路径</h1>
      <Tabs defaultValue="features">
        <TabsList>
          <TabsTrigger value="features">教学特色</TabsTrigger>
          <TabsTrigger value="paths">学习路径</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-4">
          <ServiceFeaturesTab />
        </TabsContent>
        <TabsContent value="paths" className="mt-4">
          <LearningPathsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
