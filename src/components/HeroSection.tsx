import React from 'react';
import { ArrowDown, Check, FileCheck, Layers, Sparkles, Workflow, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { EndpointConfig } from '../types';

interface HeroSectionProps {
  config: EndpointConfig;
  onJumpToUpload: () => void;
  onOpenSettings: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onJumpToUpload,
  onOpenSettings,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-900">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-indigo-600/15 via-sky-600/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Enterprise Status Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TalentPulse Enterprise</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <span>n8n Orchestration Node Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Autonomous Talent Intelligence &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300">
                AI Resume Ingestion.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Accelerate executive candidate screening with enterprise-grade ATS evaluation,
              semantic competency benchmarking, and automated webhook ingestion directly into your cloud hiring pipeline.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onJumpToUpload}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Candidate Ingestion</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-colors shadow-sm"
              >
                <Workflow className="h-4 w-4 text-indigo-400" />
                <span>Inspect n8n Pipeline</span>
              </button>
            </div>

            {/* Quiet Enterprise Proof Points */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">99.4%</div>
                <div className="text-xs text-slate-400">ATS Parsing Accuracy</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-300">&lt; 850ms</div>
                <div className="text-xs text-slate-400">Webhook Processing</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">24 / 7</div>
                <div className="text-xs text-slate-400">Autonomous Ingestion</div>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual Showcase with Generated Platform Image */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-2.5 shadow-2xl shadow-indigo-950/40">
              {/* Top Glassmorphic Frame Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 text-xs text-slate-400 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-300 ml-1">talentpulse.cloud/pipeline</span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="h-2.5 w-2.5" />
                  CONNECTED
                </span>
              </div>

              {/* Main Visual Image Container */}
              <div className="relative overflow-hidden rounded-xl border border-slate-800">
                <img
                  src="/src/assets/images/hero_talent_platform_1790761574798.jpg"
                  alt="TalentPulse Enterprise AI Intelligence Platform Interface"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Analytics HUD Card */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800/90 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <BrainCircuit className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-[12px]">Neural Candidate Scoring</p>
                      <p className="text-[10px] text-slate-400 font-mono">Workflow ID: a8b86a7c</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    Active Node
                  </span>
                </div>
              </div>

              {/* Bottom Quick-Telemetry Summary */}
              <div className="mt-3 px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-indigo-400" />
                  n8n Cloud Webhook Ingestion
                </span>
                <span className="text-slate-500">Live Production Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
