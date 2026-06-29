import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Advantage, Course, SiteConfig } from '@/types/api';import { CardsSkeleton, ErrorBanner, SectionTitle } from '@/components/Shared';

const iconMap: Record<string, React.ReactNode> = {
  academic: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
  teacher: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  project: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  ),
  award: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>
  ),
};

export default function Home() {
  const config = useApi<SiteConfig>(() => api.getSiteConfig());
  const advantagesQuery = useApi<Advantage[]>(() => api.getAdvantages());
  const coursesQuery = useApi<Course[]>(() => api.getHomeCourses());

  const cfg = config.data || {};

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {(cfg.hero_badge) && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {cfg.hero_badge}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="text-foreground">{cfg.hero_title_1 || '用编程'}</span>
                <br />
                <span className="text-primary">{cfg.hero_title_2 || '开启孩子的'}</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {cfg.hero_title_3 || '未来创造力'}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {cfg.hero_subtitle || '重庆矢量猫科技，专注6-16岁青少年编程教育。'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 text-base font-semibold shadow-lg shadow-accent/25">
                    {cfg.cta_primary || '预约免费试听'}
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-2">
                    {cfg.cta_secondary || '了解课程体系'}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-foreground">{cfg.stats_students || '500+'}</div>
                  <div className="text-sm text-muted-foreground">{cfg.stats_students_label || '在读学员'}</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{cfg.stats_renewal || '96%'}</div>
                  <div className="text-sm text-muted-foreground">{cfg.stats_renewal_label || '续课率'}</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{cfg.stats_awards || '200+'}</div>
                  <div className="text-sm text-muted-foreground">{cfg.stats_awards_label || '竞赛获奖'}</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg className="w-48 h-48 text-primary/60" viewBox="0 0 200 200" fill="none">
                    <rect x="40" y="30" width="120" height="90" rx="12" stroke="currentColor" strokeWidth="3" />
                    <rect x="55" y="45" width="90" height="8" rx="4" fill="currentColor" opacity="0.5" />
                    <rect x="55" y="60" width="65" height="8" rx="4" fill="currentColor" opacity="0.3" />
                    <rect x="55" y="75" width="75" height="8" rx="4" fill="currentColor" opacity="0.3" />
                    <circle cx="100" cy="155" r="20" stroke="currentColor" strokeWidth="3" />
                    <path d="M90 155 L100 145 L110 155" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="75" cy="160" r="5" fill="#f59e0b" />
                    <circle cx="125" cy="160" r="5" fill="#3b82f6" />
                    <circle cx="100" cy="170" r="5" fill="#10b981" />
                  </svg>
                </div>
                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="text-2xl">🐱</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                  <span className="text-xl">💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.home_advantages_title}
            subtitle={cfg.home_advantages_subtitle}
          />
          {advantagesQuery.loading ? (
            <CardsSkeleton count={4} />
          ) : advantagesQuery.error ? (
            <ErrorBanner message={advantagesQuery.error} onRetry={advantagesQuery.refetch} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantagesQuery.data?.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5">
                      {iconMap[item.icon] || <span className="text-2xl">📌</span>}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.home_courses_title}
            subtitle={cfg.home_courses_subtitle}
          />
          {coursesQuery.loading ? (
            <CardsSkeleton count={4} />
          ) : coursesQuery.error ? (
            <ErrorBanner message={coursesQuery.error} onRetry={coursesQuery.refetch} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coursesQuery.data?.map((course) => (
                <Card key={course.id} className="border-0 shadow-lg shadow-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className={`h-2 bg-gradient-to-r ${course.colorClass || 'from-primary to-accent'}`} />
                  <CardContent className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-muted-foreground mb-3">
                      {course.ageRange}
                    </span>
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.description?.substring(0, 60)}...</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.features?.slice(0, 3).map((f) => (
                        <span key={f.id} className="px-2.5 py-1 rounded-md bg-slate-100 text-xs text-slate-600">
                          {f.content.substring(0, 8)}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="rounded-full px-10 text-base font-semibold border-2">
                查看完整课程体系 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {cfg.cta_section_title || '让孩子领先一步，从第一行代码开始'}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {cfg.cta_section_subtitle || '现在预约，即可获得免费编程能力测评 + 体验课一节'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50 rounded-full px-10 text-base font-bold shadow-xl">
              立即预约 →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
