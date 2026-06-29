import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { Course, ServiceFeature, LearningPath, SiteConfig } from '@/types/api';
import { CardsSkeleton, ErrorBanner, SectionTitle } from '@/components/Shared';

export default function Services() {
  const config = useApi<SiteConfig>(() => api.getSiteConfig());
  const coursesQuery = useApi<Course[]>(() => api.getCourses());
  const featuresQuery = useApi<ServiceFeature[]>(() => api.getServiceFeatures());
  const pathsQuery = useApi<LearningPath[]>(() => api.getLearningPaths());

  const cfg = config.data || {};

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary to-blue-700 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            {cfg.services_page_title || '产品服务体系'}
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {cfg.services_page_subtitle || '科学的课程体系，专业的教学服务'}
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {coursesQuery.loading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : coursesQuery.error ? (
            <ErrorBanner message={coursesQuery.error} onRetry={coursesQuery.refetch} />
          ) : (
            <div className="grid gap-8">
              {coursesQuery.data?.map((course) => (
                <Card key={course.id} className={`border-0 border-l-4 ${course.borderColor || 'border-l-primary'} shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300`}>
                  <div className="grid lg:grid-cols-3">
                    {/* Left - Intro */}
                    <div className={`${course.bgColor || 'bg-slate-50'} p-8 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none`}>
                      <div className="text-4xl mb-4">{course.icon || '📚'}</div>
                      <Badge className="mb-3 bg-white text-foreground border-border">{course.ageRange}</Badge>
                      <h3 className="text-xl font-bold text-foreground mb-1">{course.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{course.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                    </div>

                    {/* Middle - Features */}
                    <div className="p-8">
                      <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-4">课程特色</h4>
                      <ul className="space-y-3">
                        {course.features?.map((f) => (
                          <li key={f.id} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            {f.content}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right - Info */}
                    <div className="p-8 border-t lg:border-t-0 lg:border-l border-border">
                      <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-4">课程信息</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">课程级别</p>
                          <div className="flex flex-wrap gap-2">
                            {course.levels?.map((l) => (
                              <Badge key={l.id} variant="secondary" className="text-xs">{l.name}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">课时安排</p>
                          <p className="text-sm font-medium text-foreground">{course.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">适合年龄</p>
                          <p className="text-sm font-medium text-foreground">{course.ageRange}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Teaching Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.services_feature_title || '教学服务特色'}
            subtitle={cfg.services_feature_subtitle || '不止于课堂，我们提供全方位的教学服务保障'}
          />
          {featuresQuery.loading ? (
            <CardsSkeleton count={6} />
          ) : featuresQuery.error ? (
            <ErrorBanner message={featuresQuery.error} onRetry={featuresQuery.refetch} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuresQuery.data?.map((f) => (
                <Card key={f.id} className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4">{f.icon}</div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.services_path_title || '学习成长路径'}
            subtitle={cfg.services_path_subtitle || '从入门到竞赛，一条清晰的编程成长路线'}
          />
          {pathsQuery.loading ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : pathsQuery.error ? (
            <ErrorBanner message={pathsQuery.error} onRetry={pathsQuery.refetch} />
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {pathsQuery.data?.map((item, i) => (
                <div key={item.id} className="flex md:flex-col items-center gap-3 md:gap-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                    {item.icon || '📌'}
                  </div>
                  <div className="md:text-center md:mt-4">
                    <span className="text-xs font-bold text-primary">{item.stepNumber}</span>
                    <h4 className="font-semibold text-foreground text-sm mt-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.ageRange}</p>
                  </div>
                  {i < (pathsQuery.data?.length || 4) - 1 && (
                    <div className="hidden md:block">
                      <svg className="w-6 h-6 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
