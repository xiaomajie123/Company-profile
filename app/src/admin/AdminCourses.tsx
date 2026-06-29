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
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminCourse, AdminCourseFeature, AdminCourseLevel } from './types';

const defaultCourse: AdminCourse = {
  name: '', subtitle: '', description: '', ageRange: '',
  minAge: 0, maxAge: 0, icon: '', colorClass: '', borderColor: '',
  bgColor: '', duration: '', sortOrder: 0, isActive: 1, isShowHome: 1,
  features: [], levels: [],
};

const defaultFeature: AdminCourseFeature = { content: '', sortOrder: 0 };
const defaultLevel: AdminCourseLevel = { name: '', sortOrder: 0 };

export default function AdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminCourse>(defaultCourse);
  const [saving, setSaving] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    setError('');
    adminApi.getCourses()
      .then(setCourses)
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const openAdd = () => {
    setEditItem({ ...defaultCourse, features: [], levels: [] });
    setDialogOpen(true);
  };

  const openEdit = (course: AdminCourse) => {
    setEditItem({ ...course, features: course.features || [], levels: course.levels || [] });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...editItem };
      if (editItem.id) {
        await adminApi.updateCourse(editItem.id, data);
        toast.success('更新成功');
      } else {
        await adminApi.createCourse(data);
        toast.success('创建成功');
      }
      setDialogOpen(false);
      fetchCourses();
    } catch (err: any) {
      toast.error(err.message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('确认删除此课程？')) return;
    try {
      await adminApi.deleteCourse(id);
      toast.success('删除成功');
      fetchCourses();
    } catch (err: any) {
      toast.error(err.message || '删除失败');
    }
  };

  const addFeature = () => {
    setEditItem((prev) => ({
      ...prev,
      features: [...(prev.features || []), { ...defaultFeature }],
    }));
  };

  const removeFeature = (index: number) => {
    setEditItem((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, field: keyof AdminCourseFeature, value: string | number) => {
    setEditItem((prev) => {
      const newFeatures = [...(prev.features || [])];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prev, features: newFeatures };
    });
  };

  const addLevel = () => {
    setEditItem((prev) => ({
      ...prev,
      levels: [...(prev.levels || []), { ...defaultLevel }],
    }));
  };

  const removeLevel = (index: number) => {
    setEditItem((prev) => ({
      ...prev,
      levels: (prev.levels || []).filter((_, i) => i !== index),
    }));
  };

  const updateLevel = (index: number, field: keyof AdminCourseLevel, value: string | number) => {
    setEditItem((prev) => {
      const newLevels = [...(prev.levels || [])];
      newLevels[index] = { ...newLevels[index], [field]: value };
      return { ...prev, levels: newLevels };
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">课程管理</h1>
        <Button onClick={openAdd} size="sm"><Plus className="size-4" /> 添加课程</Button>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchCourses}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          暂无课程数据
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>课程名称</TableHead>
                <TableHead>年龄段</TableHead>
                <TableHead>时长</TableHead>
                <TableHead>排序</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.ageRange}</TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell>{c.sortOrder}</TableCell>
                  <TableCell>
                    <Badge variant={c.isActive ? 'default' : 'secondary'}>
                      {c.isActive ? '启用' : '禁用'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(c)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => c.id && handleDelete(c.id)}>
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

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editItem.id ? '编辑课程' : '添加课程'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>课程名称</Label>
              <Input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
            </div>
            <div className="col-span-2">
              <Label>副标题</Label>
              <Input value={editItem.subtitle} onChange={(e) => setEditItem({ ...editItem, subtitle: e.target.value })} />
            </div>
            <div className="col-span-2">
              <Label>描述</Label>
              <Textarea value={editItem.description} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} />
            </div>
            <div>
              <Label>年龄段</Label>
              <Input value={editItem.ageRange} onChange={(e) => setEditItem({ ...editItem, ageRange: e.target.value })} />
            </div>
            <div>
              <Label>时长</Label>
              <Input value={editItem.duration} onChange={(e) => setEditItem({ ...editItem, duration: e.target.value })} />
            </div>
            <div>
              <Label>最小年龄</Label>
              <Input type="number" value={editItem.minAge} onChange={(e) => setEditItem({ ...editItem, minAge: Number(e.target.value) })} />
            </div>
            <div>
              <Label>最大年龄</Label>
              <Input type="number" value={editItem.maxAge} onChange={(e) => setEditItem({ ...editItem, maxAge: Number(e.target.value) })} />
            </div>
            <div>
              <Label>图标</Label>
              <Input value={editItem.icon} onChange={(e) => setEditItem({ ...editItem, icon: e.target.value })} />
            </div>
            <div>
              <Label>颜色类名</Label>
              <Input value={editItem.colorClass} onChange={(e) => setEditItem({ ...editItem, colorClass: e.target.value })} />
            </div>
            <div>
              <Label>边框颜色</Label>
              <Input value={editItem.borderColor} onChange={(e) => setEditItem({ ...editItem, borderColor: e.target.value })} />
            </div>
            <div>
              <Label>背景颜色</Label>
              <Input value={editItem.bgColor} onChange={(e) => setEditItem({ ...editItem, bgColor: e.target.value })} />
            </div>
            <div>
              <Label>排序</Label>
              <Input type="number" value={editItem.sortOrder} onChange={(e) => setEditItem({ ...editItem, sortOrder: Number(e.target.value) })} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!editItem.isActive} onCheckedChange={(v) => setEditItem({ ...editItem, isActive: v ? 1 : 0 })} />
              <Label>启用</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!editItem.isShowHome} onCheckedChange={(v) => setEditItem({ ...editItem, isShowHome: v ? 1 : 0 })} />
              <Label>首页显示</Label>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>课程特点</Label>
              <Button variant="outline" size="sm" onClick={addFeature}>添加特点</Button>
            </div>
            {(editItem.features || []).map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  placeholder="内容"
                  value={f.content}
                  onChange={(e) => updateFeature(i, 'content', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="排序"
                  className="w-20"
                  value={f.sortOrder}
                  onChange={(e) => updateFeature(i, 'sortOrder', Number(e.target.value))}
                />
                <Button variant="ghost" size="icon-sm" onClick={() => removeFeature(i)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          {/* Levels */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>课程级别</Label>
              <Button variant="outline" size="sm" onClick={addLevel}>添加级别</Button>
            </div>
            {(editItem.levels || []).map((l, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  placeholder="名称"
                  value={l.name}
                  onChange={(e) => updateLevel(i, 'name', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="排序"
                  className="w-20"
                  value={l.sortOrder}
                  onChange={(e) => updateLevel(i, 'sortOrder', Number(e.target.value))}
                />
                <Button variant="ghost" size="icon-sm" onClick={() => removeLevel(i)}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
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
