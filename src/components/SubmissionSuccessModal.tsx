import React from 'react';
import { CheckCircle2, Download, ExternalLink, ArrowRight, ShieldCheck, Clock, FileText, Send, Sparkles } from 'lucide-react';
import { SubmissionRecord, EndpointConfig } from '../types';

interface SubmissionSuccessModalProps {
  record: SubmissionRecord | null;
  config: EndpointConfig;
  onClose: () => void;
  onReset: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  record,
  config,
  onClose,
  onReset,
}) => {
  if (!record) return null;

  const downloadReceipt = () => {
    const text = `=====================================================
TALENTPULSE AI - CANDIDATE INGESTION RECEIPT
=====================================================
Receipt ID:        ${record.id}
Timestamp:         ${new Date(record.timestamp).toLocaleString()}
Endpoint Mode:     ${record.endpointUsed.toUpperCase()}
Execution Status:  HTTP ${record.responseStatus || 200} (OK)

CANDIDATE DETAILS:
Name:              ${record.name}
Email:             ${record.email}
Target Role:       ${record.targetRole}

ATTACHED ASSET:
Filename:          ${record.fileName}
Size:              ${(record.fileSize / 1024).toFixed(1)} KB

N8N ORCHESTRATION PIPELINE:
Instance:          ${config.baseUrl}
Workflow ID:       ${config.workflowId}
Trigger Node:      Form Trigger (a8b86a7c-eb0a-47ad-ae8a-8b3ad48bff96)
Downstream:        Resume text extraction -> AI candidate grading -> Recruiter Dispatch

Estimated ATS Pre-Score: ${record.atsScore || 'N/A'}/100
=====================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Submission_Receipt_${record.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Resume Received & Ingested!
          </h3>
          <p className="text-xs text-slate-400">
            Successfully delivered to n8n workflow for automated AI evaluation and recruiter routing.
          </p>
        </div>

        {/* Receipt Summary Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono">
            <span className="text-slate-400">Submission ID:</span>
            <span className="text-indigo-400 font-semibold">{record.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <div>
              <span className="text-slate-500 block">Candidate:</span>
              <span className="font-medium text-slate-100">{record.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email:</span>
              <span className="font-medium text-slate-100">{record.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Document:</span>
              <span className="font-medium text-slate-100 truncate block">{record.fileName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Target Role:</span>
              <span className="font-medium text-slate-100">{record.targetRole}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Server Response:</span>
            <span className="text-emerald-400 font-mono font-medium">
              {record.responseSummary || 'HTTP 200 OK'}
            </span>
          </div>
        </div>

        {/* Downstream Workflow Progress */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-300">Automated Pipeline Lifecycle:</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                1. Webhook Payload Received
              </span>
              <span className="font-mono text-emerald-400">Delivered</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-200">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                2. AI Extraction & Score Matrix
              </span>
              <span className="font-mono text-sky-400">In Progress</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                3. Recruiter Notification / Email Dispatch
              </span>
              <span className="font-mono text-slate-500">Queued</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={downloadReceipt}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Receipt (.txt)</span>
          </button>

          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors flex items-center justify-center gap-2"
          >
            <span>Submit Another Resume</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
