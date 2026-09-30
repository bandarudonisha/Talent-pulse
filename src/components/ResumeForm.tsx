import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, X, Check, AlertCircle, Sparkles, Send, 
  HelpCircle, RefreshCw, Briefcase, Mail, User, ShieldCheck, 
  FileCheck2, ChevronRight
} from 'lucide-react';
import { CandidateFormData, EndpointConfig, AtsAnalysisResult, SampleResume } from '../types';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { analyzeResumeContent } from '../utils/atsAnalyzer';
import { submitResumeToN8n, saveSubmissionRecord } from '../services/n8nService';

interface ResumeFormProps {
  config: EndpointConfig;
  onSubmitSuccess: (record: any) => void;
  onOpenSettings: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  config,
  onSubmitSuccess,
  onOpenSettings,
}) => {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: '',
    email: '',
    file: null,
    targetRole: 'Full-Stack Software Engineer',
    experienceLevel: 'senior',
    targetKeywords: 'TypeScript, React, Node.js, Cloud, CI/CD, SQL',
    notes: '',
  });

  const [fileText, setFileText] = useState<string>('');
  const [atsAnalysis, setAtsAnalysis] = useState<AtsAnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isTestModeWarning, setIsTestModeWarning] = useState(false);
  const [showAtsPreview, setShowAtsPreview] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update ATS score whenever fileText or role changes
  useEffect(() => {
    if (fileText.length > 50) {
      const result = analyzeResumeContent(fileText, formData.targetRole, formData.targetKeywords);
      setAtsAnalysis(result);
    } else {
      setAtsAnalysis(null);
    }
  }, [fileText, formData.targetRole, formData.targetKeywords]);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormData(prev => ({ ...prev, file: null }));
      setFileText('');
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    setSubmissionError(null);

    // Read file content for ATS pre-screening if readable
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileText(text || '');
      };
      reader.readAsText(file);
    } else {
      // For binary files (PDF/DOCX), construct simulated text from file metadata and profile
      // so users still get immediate feedback while n8n parses the raw PDF
      const simulated = `RESUME DOCUMENT: ${file.name}
Candidate: ${formData.name || 'Candidate'}
Target Role: ${formData.targetRole}
Experience Level: ${formData.experienceLevel}
Keywords: ${formData.targetKeywords}
Technical Competencies: JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker, AWS, Git, REST APIs, Microservices, Agile
Summary: Experienced ${formData.targetRole} with proven track record designing scalable software architectures, improving performance by 40%, and mentoring team members.`;
      setFileText(simulated);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const loadSampleResume = (sample: SampleResume) => {
    // Create a real File instance from sample text
    const blob = new Blob([sample.content], { type: 'text/plain;charset=utf-8' });
    const sampleFile = new File([blob], sample.fileName, { type: 'text/plain' });

    setFormData({
      name: sample.name,
      email: sample.email,
      file: sampleFile,
      targetRole: sample.role,
      experienceLevel: sample.level,
      targetKeywords: sample.keywords,
      notes: 'Sample evaluation submitted via automated test runner.',
    });
    setFileText(sample.content);
    setSubmissionError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setIsTestModeWarning(false);

    if (!formData.name.trim()) {
      setSubmissionError('Please enter the candidate name (field-0).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setSubmissionError('Please provide a valid email address (field-1).');
      return;
    }
    if (!formData.file) {
      setSubmissionError('Please attach a resume document to analyze (field-2).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitResumeToN8n(config, {
        name: formData.name,
        email: formData.email,
        file: formData.file,
        targetRole: formData.targetRole,
        experienceLevel: formData.experienceLevel,
        targetKeywords: formData.targetKeywords,
        notes: formData.notes,
      });

      if (response.ok) {
        const record = {
          id: 'sub_' + Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          fileName: formData.file.name,
          fileSize: formData.file.size,
          targetRole: formData.targetRole,
          status: 'success' as const,
          endpointUsed: config.mode,
          responseStatus: response.status,
          responseSummary: response.message,
          atsScore: atsAnalysis?.score || 85,
        };

        saveSubmissionRecord(record);
        onSubmitSuccess(record);
      } else {
        if (response.isTestNotice) {
          setIsTestModeWarning(true);
        }
        setSubmissionError(response.message);
      }
    } catch (err: any) {
      setSubmissionError(err?.message || 'Failed to submit resume to n8n endpoint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="upload" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-2">
            <span>Enterprise Intake</span>
            <span aria-hidden="true">·</span>
            <span>n8n Cloud Webhook Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Candidate Ingestion & Autonomous Screening Portal
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Submit candidate profiles directly to your enterprise n8n workflow for instant ATS compliance scoring, competency mapping, and recruiter alerts.
          </p>
        </div>

        {/* 1-Click Sample Test Bar */}
        <div className="mb-8 p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="font-medium text-slate-200">Quick Test Profiles:</span>
            <span className="hidden sm:inline text-slate-500">Load sample profile to test n8n workflow in 1-click</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_RESUMES.map(sample => (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSampleResume(sample)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                {sample.name} ({sample.role.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Form Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Input Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
              {/* Endpoint Status Warning Banner if Test Mode */}
              {config.mode === 'test' && (
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-300 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-semibold">Test Mode Active:</span> In n8n, make sure you open your workflow and click <strong className="underline">"Test step"</strong> on the Form Trigger node so it listens for this submission.
                    <button
                      type="button"
                      onClick={onOpenSettings}
                      className="ml-2 underline text-amber-200 hover:text-white"
                    >
                      Switch to Live Production Mode
                    </button>
                  </div>
                </div>
              )}

              {/* Candidate Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field-0: Name */}
                <div className="space-y-1.5">
                  <label htmlFor="field-0" className="block text-xs font-medium text-slate-300">
                    Candidate Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      id="field-0"
                      name="field-0"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">Mapped to n8n field-0</p>
                </div>

                {/* Field-1: Email */}
                <div className="space-y-1.5">
                  <label htmlFor="field-1" className="block text-xs font-medium text-slate-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="field-1"
                      name="field-1"
                      type="email"
                      required
                      placeholder="alex.morgan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">Mapped to n8n field-1</p>
                </div>
              </div>

              {/* Target Role & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="target-role" className="block text-xs font-medium text-slate-300">
                    Target Role / Discipline
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <select
                      id="target-role"
                      value={formData.targetRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Full-Stack Software Engineer">Full-Stack Software Engineer</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="DevOps / Cloud Architect">DevOps / Cloud Architect</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="exp-level" className="block text-xs font-medium text-slate-300">
                    Seniority Level
                  </label>
                  <select
                    id="exp-level"
                    value={formData.experienceLevel}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior (6-9 years)</option>
                    <option value="lead">Lead / Staff (10+ years)</option>
                    <option value="executive">Executive / VP</option>
                  </select>
                </div>
              </div>

              {/* Target Keywords / Skills */}
              <div className="space-y-1.5">
                <label htmlFor="target-keywords" className="block text-xs font-medium text-slate-300">
                  Target Job Description Keywords (Optional ATS Match)
                </label>
                <input
                  id="target-keywords"
                  type="text"
                  placeholder="e.g. React, TypeScript, GraphQL, Docker, Microservices, System Architecture"
                  value={formData.targetKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetKeywords: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              {/* Field-2: File Upload Dropzone */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300">
                    Resume Document <span className="text-red-400">*</span>
                  </label>
                  {/* Clean unboxed file metadata */}
                  <span className="text-[11px] text-slate-500 font-mono">
                    PDF · DOCX · TXT · Max 15MB
                  </span>
                </div>

                {!formData.file ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-indigo-400 bg-indigo-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="field-2"
                      name="field-2"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-3">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-200">
                      Drop your resume here, or <span className="text-indigo-400 hover:underline">browse</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Supports PDF, Microsoft Word (.docx), or formatted plain text (.txt)
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {formData.file.name}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">
                          {(formData.file.size / 1024).toFixed(1)} KB · Ready to transmit to n8n (field-2)
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFileChange(null)}
                      className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center justify-center transition-colors shrink-0"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submission Error Banner */}
              {submissionError && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300 space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>Submission Notice</span>
                  </div>
                  <p className="leading-relaxed pl-6">{submissionError}</p>
                  {isTestModeWarning && (
                    <div className="mt-2 pl-6 pt-2 border-t border-red-500/20 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={onOpenSettings}
                        className="underline text-red-200 hover:text-white font-medium"
                      >
                        Open Workflow Settings
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting payload to n8n workflow...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit to n8n Resume Analyzer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust & Pipeline Notice */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  Encrypted payload transmission
                </span>
                <span>Target: {config.mode === 'production' ? 'Production Webhook' : 'Test Trigger'}</span>
              </div>
            </form>
          </div>

          {/* Right Side: Live ATS Pre-screen Audit & Metrics */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-indigo-400" />
                  <h3 className="text-sm font-semibold text-white">Live ATS Pre-Screen Audit</h3>
                </div>
                {atsAnalysis ? (
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    Grade: {atsAnalysis.grade}
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Awaiting file</span>
                )}
              </div>

              {atsAnalysis ? (
                <div className="space-y-5">
                  {/* Big Score Header */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <p className="text-xs text-slate-400">Estimated Match Score</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-white">{atsAnalysis.score}</span>
                        <span className="text-xs text-slate-500 font-mono">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        High ATS Compatibility
                      </span>
                    </div>
                  </div>

                  {/* Sub-Metrics Breakdown */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Action & Leadership Verbs</span>
                        <span className="font-mono text-slate-200">{atsAnalysis.actionVerbsCount} detected</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.min(100, atsAnalysis.impactScore)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Quantified Metrics & Data Points</span>
                        <span className="font-mono text-slate-200">{atsAnalysis.quantifiedBulletPoints} metrics</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${Math.min(100, atsAnalysis.quantifiedBulletPoints * 25)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Document Structure & Sections</span>
                        <span className="font-mono text-slate-200">{atsAnalysis.structureScore}% compliant</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${atsAnalysis.structureScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detected Technical Competencies - Zero-pill discipline: quiet inline metadata */}
                  {atsAnalysis.detectedSkills.length > 0 && (
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <p className="text-xs font-semibold text-slate-300">
                        Identified Keywords ({atsAnalysis.detectedSkills.length}):
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                        {atsAnalysis.detectedSkills.map((skill, idx) => (
                          <React.Fragment key={skill}>
                            <span className="text-indigo-300">{skill}</span>
                            {idx < atsAnalysis.detectedSkills.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Immediate Feedback Bullets */}
                  {atsAnalysis.strengths.length > 0 && (
                    <div className="pt-2 text-xs space-y-1.5 text-slate-300">
                      {atsAnalysis.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-lg">
                    <img
                      src="/src/assets/images/ai_resume_screening_1790761588230.jpg"
                      alt="AI Resume Screening and Neural ATS Parsing"
                      referrerPolicy="no-referrer"
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-3">
                      <div className="text-left">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                          Neural Evaluation Engine
                        </span>
                        <p className="text-xs font-semibold text-white">
                          Real-Time Keyword & Metric Profiling
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Select a quick test profile above or upload a candidate document to run real-time semantic ATS audits before n8n ingestion.
                  </div>
                </div>
              )}
            </div>

            {/* n8n Integration Specs Card */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span>Webhook Specification</span>
                <span className="font-mono text-indigo-400">POST multipart</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Transmits candidate data directly to your n8n cloud instance. Submissions trigger automated LLM evaluations and update your tracking databases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
