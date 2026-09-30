import React from 'react';
import { Activity, Settings, ExternalLink, Zap, CheckCircle2, Clock } from 'lucide-react';
import { EndpointConfig } from '../types';

interface NavbarProps {
  config: EndpointConfig;
  onOpenSettings: () => void;
  onToggleMode: (newMode: 'production' | 'test') => void;
  isOnline: boolean | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenSettings,
  onToggleMode,
  isOnline,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/10">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                Talent<span className="text-indigo-400">Pulse</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Enterprise AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Talent Ingestion & Intelligence</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium tracking-wide uppercase">
          <a
            href="#upload"
            className="hover:text-white transition-colors duration-150"
          >
            Candidate Ingestion
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-150"
          >
            Pipeline Architecture
          </a>
          <a
            href="#enterprise-preview"
            className="hover:text-white transition-colors duration-150"
          >
            Talent Intelligence
          </a>
          <a
            href="#history"
            className="hover:text-white transition-colors duration-150"
          >
            Audit Log
          </a>
          <a
            href="#ats-guide"
            className="hover:text-white transition-colors duration-150"
          >
            ATS Benchmarks
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => onToggleMode('production')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                config.mode === 'production'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Runs continuously on n8n production webhook"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live
              </span>
            </button>
            <button
              onClick={() => onToggleMode('test')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                config.mode === 'test'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Runs on n8n test webhook (requires 'Execute step' in n8n)"
            >
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                Test
              </span>
            </button>
          </div>

          {/* Workflow Settings & Diagnostics */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            title="Configure n8n webhook connection"
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Workflow Config</span>
          </button>
        </div>
      </div>
    </header>
  );
};
