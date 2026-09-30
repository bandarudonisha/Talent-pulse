import React from 'react';
import { UploadCloud, Cpu, Award, MailCheck, ArrowRight, ShieldCheck, Users, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Structured Candidate Intake',
      desc: 'Candidates submit profiles with PDF, Word, or text documents. Client pre-flight checks enforce parsing readiness and prepare the multipart payload.',
      icon: UploadCloud,
      meta: 'field-0 · field-1 · field-2',
    },
    {
      step: '02',
      title: 'n8n Orchestration Node',
      desc: 'Your cloud-hosted n8n webhook at nishabandaru.app.n8n.cloud receives submissions with sub-second latency and triggers concurrent worker pipelines.',
      icon: Cpu,
      meta: 'Webhook Form Trigger · 200 OK',
    },
    {
      step: '03',
      title: 'Neural Semantic Scoring',
      desc: 'The workflow parses text structures, evaluates quantified achievements against target competencies, and generates an objective ATS audit dossier.',
      icon: Award,
      meta: 'LLM Extraction · Keyword Density',
    },
    {
      step: '04',
      title: 'Hiring Team Dispatch',
      desc: 'Executive candidate scorecards are automatically routed to hiring managers via Slack, synchronized with ATS (Greenhouse/Lever), and emailed.',
      icon: MailCheck,
      meta: 'Multi-Channel Recruiter Alerts',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Pipeline Architecture Header */}
        <div>
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
              <span>Pipeline Architecture</span>
              <span aria-hidden="true">·</span>
              <span>n8n Cloud Orchestration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              End-to-End Autonomous Talent Workflow
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              A resilient, enterprise-grade cloud pipeline engineered to eliminate manual resume screening and provide instant candidate intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:bg-slate-900/80 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                    {item.meta}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Recruitment Team Showcase Section */}
        <div id="enterprise-preview" className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
              <img
                src="/src/assets/images/recruitment_team_1790761600345.jpg"
                alt="Executive Recruitment Team Reviewing AI Talent Dossiers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-medium">Talent Acquisition Squad</span>
                </div>
                <span className="font-mono text-[11px] text-indigo-300">Live Decision Matrix</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-mono text-sky-300">
                <Users className="h-3.5 w-3.5" />
                <span>Enterprise Talent Intelligence</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Empower Recruiter Decision-Making with Calibrated AI Dossiers
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                TalentPulse seamlessly bridges raw resume submissions and executive hiring velocity. Instead of spending 15 minutes parsing each PDF, hiring committees receive instant, standardized evaluations.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-semibold">Objective Bias-Free Pre-Screening:</strong>
                    <span className="text-slate-400"> Calibrated against verified industry skills and quantifiable achievements.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-semibold">Zero Vendor Lock-in with n8n:</strong>
                    <span className="text-slate-400"> Every submission is routed through your own self-hosted or cloud n8n workflows for complete data ownership.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-semibold">Real-Time Webhook Receipts:</strong>
                    <span className="text-slate-400"> Instant cryptographic-style submission receipts and status tracking for candidates.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
