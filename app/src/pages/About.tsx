import { Card, CardContent } from '@/components/ui/card';
import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/api';
import type { CompanyInfo, TeamMember, Milestone, SiteConfig } from '@/types/api';
import { CardsSkeleton, ErrorBanner, SectionTitle } from '@/components/Shared';

export default function About() {
  const config = useApi<SiteConfig>(() => api.getSiteConfig());
  const storyQuery = useApi<CompanyInfo[]>(() => api.getCompanyStory());
  const valuesQuery = useApi<CompanyInfo[]>(() => api.getCompanyValues());
  const teamQuery = useApi<TeamMember[]>(() => api.getTeamMembers());
  const milestonesQuery = useApi<Milestone[]>(() => api.getMilestones());

  const cfg = config.data || {};

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
            {cfg.about_page_title || '关于矢量猫科技'}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {cfg.about_page_subtitle || '我们是一家充满热情与创造力的少儿编程教育公司'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">我们的故事</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">
                {cfg.about_story_title || '从热爱到使命'}
              </h2>
              {storyQuery.loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : storyQuery.error ? (
                <ErrorBanner message={storyQuery.error} />
              ) : (
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {storyQuery.data?.map((p) => (
                    <p key={p.id}>{p.content}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl">🏫</div>
                <div className="h-48 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl">🏆</div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-4xl">💻</div>
                <div className="h-40 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-4xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.about_values_title || '我们的教育理念'}
            subtitle={cfg.about_values_subtitle || '用正确的理念，做正确的教育'}
          />
          {valuesQuery.loading ? (
            <CardsSkeleton count={4} />
          ) : valuesQuery.error ? (
            <ErrorBanner message={valuesQuery.error} onRetry={valuesQuery.refetch} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuesQuery.data?.map((v) => (
                <Card key={v.id} className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{v.icon || '🎯'}</div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.about_team_title || '核心教学团队'}
            subtitle={cfg.about_team_subtitle || '来自名校、热爱教育、精通编程的专业师资'}
          />
          {teamQuery.loading ? (
            <CardsSkeleton count={4} />
          ) : teamQuery.error ? (
            <ErrorBanner message={teamQuery.error} onRetry={teamQuery.refetch} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamQuery.data?.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-3xl mx-auto mb-4">
                      {member.avatar || '👤'}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={cfg.about_milestone_title || '发展历程'}
            subtitle={cfg.about_milestone_subtitle || '每一步，都走得扎实'}
          />
          {milestonesQuery.loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : milestonesQuery.error ? (
            <ErrorBanner message={milestonesQuery.error} onRetry={milestonesQuery.refetch} />
          ) : (
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary md:-translate-x-px" />
              <div className="space-y-8">
                {milestonesQuery.data?.map((m, i) => (
                  <div key={m.id} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-white shadow -translate-x-1/2 z-10 mt-1.5" />
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className="border-0 shadow-lg shadow-slate-200/50">
                        <CardContent className="p-5">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                            {m.year}
                          </span>
                          <h3 className="font-semibold text-foreground mb-1">{m.title}</h3>
                          <p className="text-sm text-muted-foreground">{m.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
