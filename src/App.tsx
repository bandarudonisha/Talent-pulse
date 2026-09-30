/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResumeForm } from './components/ResumeForm';
import { HowItWorks } from './components/HowItWorks';
import { SubmissionsHistory } from './components/SubmissionsHistory';
import { AtsTipsGuide } from './components/AtsTipsGuide';
import { Footer } from './components/Footer';
import { WorkflowInspectorModal } from './components/WorkflowInspectorModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { EndpointConfig, SubmissionRecord } from './types';
import { 
  getStoredConfig, 
  saveConfig, 
  getSubmissionHistory, 
  clearSubmissionHistory,
  pingN8nEndpoint 
} from './services/n8nService';

export default function App() {
  const [config, setConfig] = useState<EndpointConfig>(getStoredConfig());
  const [history, setHistory] = useState<SubmissionRecord[]>(getSubmissionHistory());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSuccessRecord, setActiveSuccessRecord] = useState<SubmissionRecord | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // Background ping check on startup
  useEffect(() => {
    let mounted = true;
    pingN8nEndpoint(config).then(res => {
      if (mounted) {
        setIsOnline(res.online);
      }
    });
    return () => {
      mounted = false;
    };
  }, [config.baseUrl, config.workflowId, config.mode, config.customUrl]);

  const handleUpdateConfig = (newConfig: EndpointConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const handleToggleMode = (newMode: 'production' | 'test') => {
    const updated = { ...config, mode: newMode };
    setConfig(updated);
    saveConfig(updated);
  };

  const handleSubmissionSuccess = (record: SubmissionRecord) => {
    setActiveSuccessRecord(record);
    setHistory(getSubmissionHistory());
  };

  const handleClearHistory = () => {
    clearSubmissionHistory();
    setHistory([]);
  };

  const scrollToUpload = () => {
    const el = document.getElementById('upload');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Top Navbar */}
      <Navbar
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleMode={handleToggleMode}
        isOnline={isOnline}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          config={config}
          onJumpToUpload={scrollToUpload}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Upload & Form Processing Section */}
        <ResumeForm
          config={config}
          onSubmitSuccess={handleSubmissionSuccess}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* How It Works Architecture */}
        <HowItWorks />

        {/* Local History Table */}
        <SubmissionsHistory
          history={history}
          onClearHistory={handleClearHistory}
          onSelectRecord={(rec) => setActiveSuccessRecord(rec)}
        />

        {/* ATS Compliance Guidance */}
        <AtsTipsGuide />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Workflow Diagnostics & Settings Modal */}
      <WorkflowInspectorModal
        config={config}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateConfig={handleUpdateConfig}
      />

      {/* Submission Success & Next Steps Modal */}
      <SubmissionSuccessModal
        record={activeSuccessRecord}
        config={config}
        onClose={() => setActiveSuccessRecord(null)}
        onReset={() => {
          setActiveSuccessRecord(null);
          scrollToUpload();
        }}
      />
    </div>
  );
}
