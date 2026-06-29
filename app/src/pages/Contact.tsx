import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { SiteConfig, ContactFormData } from '@/types/api';

export default function Contact() {
  const config = useApi<SiteConfig>(() => api.getSiteConfig());
  const cfg = config.data || {};

  const [formData, setFormData] = useState<ContactFormData>({
    parentName: '',
    phone: '',
    childAge: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);
    try {
      await api.submitContact(formData);
      setSubmitResult({ success: true, message: '感谢您的预约！我们会在24小时内与您联系。' });
      setFormData({ parentName: '', phone: '', childAge: '', message: '' });
    } catch (err) {
      setSubmitResult({
        success: false,
        message: err instanceof Error ? err.message : '提交失败，请稍后重试',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactItems = [
    { icon: 'phone', title: '电话咨询', content: cfg.phone, desc: cfg.business_hours },
    { icon: 'mail', title: '电子邮箱', content: cfg.email, desc: '我们会在24小时内回复' },
    { icon: 'location', title: '公司地址', content: cfg.address, desc: '矢量猫科技教学中心' },
    { icon: 'clock', title: '营业时间', content: '周一至周日', desc: cfg.business_hours },
  ];

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            {cfg.contact_page_title || '联系我们'}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {cfg.contact_page_subtitle || '预约免费试听课，为孩子开启编程世界的大门'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {cfg.contact_form_title || '预约免费试听'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {cfg.contact_form_subtitle || '填写以下信息，我们将为您安排免费的编程能力测评和体验课'}
              </p>

              {submitResult?.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {submitResult.message}
                </div>
              )}

              {submitResult?.success === false && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {submitResult.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">家长姓名 <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    placeholder="请输入您的姓名"
                    value={formData.parentName}
                    onChange={(e) => handleChange('parentName', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">联系电话 <span className="text-destructive">*</span></Label>
                  <Input
                    id="phone"
                    placeholder="请输入您的手机号码"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childAge">孩子年龄</Label>
                  <select
                    id="childAge"
                    value={formData.childAge}
                    onChange={(e) => handleChange('childAge', e.target.value)}
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">请选择孩子年龄</option>
                    <option value="4-6">4-6岁</option>
                    <option value="6-8">6-8岁</option>
                    <option value="8-10">8-10岁</option>
                    <option value="10-12">10-12岁</option>
                    <option value="12-14">12-14岁</option>
                    <option value="14-16">14-16岁</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">留言</Label>
                  <Textarea
                    id="message"
                    placeholder="请告诉我们您的需求或疑问（选填）"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-accent/25 disabled:opacity-50"
                >
                  {submitting ? '提交中...' : '提交预约'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {cfg.contact_info_title || '联系方式'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {cfg.contact_info_subtitle || '您也可以通过以下方式直接联系我们'}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactItems.map((info) => (
                  <Card key={info.title} className="border-0 shadow-lg shadow-slate-200/50">
                    <CardContent className="p-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                        {info.icon === 'phone' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        )}
                        {info.icon === 'mail' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        )}
                        {info.icon === 'location' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                        )}
                        {info.icon === 'clock' && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{info.title}</h3>
                      <p className="text-sm font-medium text-foreground mb-1">{info.content || '待配置'}</p>
                      <p className="text-xs text-muted-foreground">{info.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg shadow-slate-200/50 overflow-hidden">
                <div className="aspect-video bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <p className="text-sm text-slate-400">地图加载区域</p>
                    <p className="text-xs text-slate-300 mt-1">{cfg.address || '重庆市'}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
