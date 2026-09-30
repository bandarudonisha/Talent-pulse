import React from 'react';
import { Zap, ExternalLink, Workflow } from 'lucide-react';
import { EndpointConfig } from '../types';

interface FooterProps {
  config: EndpointConfig;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenSettings }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow-md shadow-indigo-600/30">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">Talent<span className="text-indigo-400">Pulse</span> AI</span>
              <p className="text-[11px] text-slate-500">Autonomous Talent Ingestion powered by n8n Workflow Automation</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <span>Cloud Cluster: nishabandaru.app.n8n.cloud</span>
            <span aria-hidden="true" className="text-slate-800">·</span>
            <span>Workflow: a8b86a7c-eb0a-47ad-ae8a-8b3ad48bff96</span>
            <span aria-hidden="true" className="text-slate-800">·</span>
            <button
              onClick={onOpenSettings}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Pipeline Diagnostics
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} TalentPulse AI Enterprise. Orchestrated via n8n Cloud Webhook Pipeline.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://nishabandaru.app.n8n.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 flex items-center gap-1 transition-colors font-mono"
            >
              <span>n8n Cloud Workspace</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
