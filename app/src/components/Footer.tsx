import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { SiteConfig } from '@/types/api';

const footerNavLinks = [
  { label: '首页', path: '/' },
  { label: '关于我们', path: '/about' },
  { label: '产品服务', path: '/services' },
  { label: '联系我们', path: '/contact' },
];

export default function Footer() {
  const config = useApi<SiteConfig>(() => api.getSiteConfig());
  const cfg = config.data || {};

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  {cfg.company_name || '矢量猫科技'}
                </span>
                <span className="block text-[10px] text-slate-400 leading-none -mt-0.5">
                  {cfg.company_name_en || 'VectorCat Tech'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {cfg.footer_description || '重庆矢量猫科技有限公司，专注于6-16岁青少年编程教育。'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">快速导航</h4>
            <ul className="space-y-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">课程服务</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Scratch 启蒙编程', path: '/services' },
                { label: 'Python 进阶编程', path: '/services' },
                { label: '机器人编程', path: '/services' },
                { label: '信息学奥赛', path: '/services' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">联系方式</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {cfg.phone && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{cfg.phone}</span>
                </li>
              )}
              {cfg.email && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{cfg.email}</span>
                </li>
              )}
              {cfg.address && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{cfg.address}</span>
                </li>
              )}
              {cfg.business_hours && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{cfg.business_hours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>{cfg.copyright || `\u00a9 ${new Date().getFullYear()} 重庆矢量猫科技有限公司 | 版权所有`}</p>
        </div>
      </div>
    </footer>
  );
}
