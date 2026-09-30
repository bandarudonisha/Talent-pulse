import React, { useState } from 'react';
import { 
  X, Activity, ExternalLink, Copy, Check, RefreshCw, 
  Workflow, AlertTriangle, Shield, CheckCircle2 
} from 'lucide-react';
import { EndpointConfig } from '../types';
import { computeEndpointUrl, pingN8nEndpoint } from '../services/n8nService';

interface WorkflowInspectorModalProps {
  config: EndpointConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (newConfig: EndpointConfig) => void;
}

export const WorkflowInspectorModal: React.FC<WorkflowInspectorModalProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'production' | 'test'>(config.mode);
  const [baseUrl, setBaseUrl] = useState(config.baseUrl);
  const [workflowId, setWorkflowId] = useState(config.workflowId);
  const [customUrl, setCustomUrl] = useState(config.customUrl || '');
  const [useCustom, setUseCustom] = useState(Boolean(config.customUrl));

  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState<{
    online: boolean;
    statusText: string;
    latencyMs: number;
    isTestNotice?: boolean;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const currentUrl = computeEndpointUrl({
    baseUrl,
    workflowId,
    mode,
    customUrl: useCustom ? customUrl : undefined,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await pingN8nEndpoint({
        baseUrl,
        workflowId,
        mode,
        customUrl: useCustom ? customUrl : undefined,
      });
      setPingResult(res);
    } finally {
      setIsPinging(false);
    }
  };

  const handleSave = () => {
    onUpdateConfig({
      baseUrl,
      workflowId,
      mode,
      customUrl: useCustom ? customUrl : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">n8n Workflow Diagnostics</h3>
              <p className="text-xs text-slate-400 font-mono">nishabandaru.app.n8n.cloud</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Active URL & Copy Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Active Endpoint Webhook URL:
          </label>
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950">
            <span className="font-mono text-xs text-indigo-300 truncate flex-1">
              {currentUrl}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy URL"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Select Execution Mode:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('production')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                mode === 'production'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Production Mode
                </span>
                <span className="text-[10px] font-mono text-emerald-400">/form/</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Listens continuously 24/7. Does not require clicking test in n8n.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode('test')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                mode === 'test'
                  ? 'border-amber-500/50 bg-amber-500/10 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Test Mode
                </span>
                <span className="text-[10px] font-mono text-amber-400">/form-test/</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Single test execution. Requires pressing "Test step" inside the n8n editor.
              </p>
            </button>
          </div>
        </div>

        {/* Live Connectivity Ping Test */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Live Endpoint Connectivity</span>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Testing...' : 'Test Connection / Ping'}</span>
            </button>
          </div>

          {pingResult && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                pingResult.online
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-red-500/30 bg-red-500/10 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {pingResult.online ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                )}
                <span>{pingResult.statusText}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">{pingResult.latencyMs}ms</span>
            </div>
          )}
        </div>

        {/* Schema Mapping Specification */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-300">n8n Form Trigger Field Schema:</span>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-mono space-y-1.5 text-slate-400">
            <div className="flex justify-between">
              <span className="text-indigo-400">field-0</span>
              <span className="text-slate-200">Candidate Full Name (Text, required)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-400">field-1</span>
              <span className="text-slate-200">Candidate Email (Email, required)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-400">field-2</span>
              <span className="text-slate-200">Resume File Binary (File, required)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <a
            href="https://nishabandaru.app.n8n.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            <span>Open n8n Cloud Workspace</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
