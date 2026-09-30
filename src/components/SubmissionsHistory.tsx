import React, { useState } from 'react';
import { History, Trash2, CheckCircle2, Download, ExternalLink, Clock, FileText } from 'lucide-react';
import { SubmissionRecord } from '../types';
import { clearSubmissionHistory } from '../services/n8nService';

interface SubmissionsHistoryProps {
  history: SubmissionRecord[];
  onClearHistory: () => void;
  onSelectRecord: (record: SubmissionRecord) => void;
}

export const SubmissionsHistory: React.FC<SubmissionsHistoryProps> = ({
  history,
  onClearHistory,
  onSelectRecord,
}) => {
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');

  const filtered = history.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <section id="history" className="py-16 md:py-20 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
              <History className="h-3.5 w-3.5" />
              <span>Local Session Audit</span>
              <span aria-hidden="true">·</span>
              <span>{history.length} Total Processed</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Submission History & Receipts
            </h2>
          </div>

          {/* Interactive filter controls: functional buttons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({history.length})
              </button>
              <button
                onClick={() => setFilter('success')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  filter === 'success'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Delivered
              </button>
            </div>

            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="p-2 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                title="Clear local history"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-12 text-center">
            <Clock className="h-8 w-8 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-300">No submissions recorded yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Once you submit a resume through the portal or use one of the quick-test profiles, its execution status will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Candidate</th>
                    <th scope="col" className="px-6 py-3.5">Target Role</th>
                    <th scope="col" className="px-6 py-3.5">Resume File</th>
                    <th scope="col" className="px-6 py-3.5">Status</th>
                    <th scope="col" className="px-6 py-3.5">Timestamp</th>
                    <th scope="col" className="px-6 py-3.5 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        <div>{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.targetRole}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-200">
                          <FileText className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate max-w-[160px]">{item.fileName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {(item.fileSize / 1024).toFixed(1)} KB
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(item.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onSelectRecord(item)}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 hover:text-white transition-colors"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
