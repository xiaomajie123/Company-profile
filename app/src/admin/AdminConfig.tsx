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
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Search, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { adminApi } from './AdminApi';
import type { AdminConfigItem } from './types';

const PAGE_SIZE = 15;

export default function AdminConfig() {
  const [configs, setConfigs] = useState<AdminConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdminConfigItem | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchConfigs = () => {
    setLoading(true);
    setError('');
    adminApi.getConfigs()
      .then((data) => {
        setConfigs(data);
        setPage(1);
      })
      .catch((err) => setError(err.message || '加载失败'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchConfigs(); }, []);

  const openEdit = (item: AdminConfigItem) => {
    setEditItem(item);
    setEditValue(item.configValue);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    try {
      await adminApi.updateConfig(editItem.configKey, editValue);
      toast.success('配置已更新');
      setDialogOpen(false);
      fetchConfigs();
    } catch (err: any) {
      toast.error(err.message || '保存失败');
    } finally {
      setSaving(false);
    }
  };

  // Filter + paginate
  const filtered = configs.filter((c) =>
    c.configKey.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">站点配置</h1>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="搜索配置..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchConfigs}>重试</Button>
        </div>
      )}

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {configs.length === 0 ? '暂无配置数据' : '未找到匹配的配置'}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px]">配置键</TableHead>
                  <TableHead>配置值</TableHead>
                  <TableHead className="w-[180px]">描述</TableHead>
                  <TableHead className="w-[80px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((c) => (
                  <TableRow key={c.id || c.configKey}>
                    <TableCell className="font-mono text-xs">{c.configKey}</TableCell>
                    <TableCell className="max-w-[300px] truncate text-sm">{c.configValue}</TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-[200px] truncate">
                      {c.description || '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(c)}>
                        <Pencil className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>
              共 {filtered.length} 条，第 {safePage}/{totalPages} 页
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === safePage ? 'default' : 'outline'}
                  size="icon-sm"
                  className="h-8 w-8 text-xs"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon-sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑配置</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="flex flex-col gap-4">
              <div>
                <Label>配置键</Label>
                <Input value={editItem.configKey} disabled className="bg-muted" />
              </div>
              <div>
                <Label>描述</Label>
                <Input value={editItem.description || ''} disabled className="bg-muted" />
              </div>
              <div>
                <Label>类型</Label>
                <Input value={editItem.configType || 'text'} disabled className="bg-muted" />
              </div>
              <div>
                <Label>配置值</Label>
                {(editItem.configValue?.length || 0) > 200 ? (
                  <Textarea
                    rows={6}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
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
