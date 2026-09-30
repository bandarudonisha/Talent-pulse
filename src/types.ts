export type EndpointMode = 'production' | 'test';

export interface EndpointConfig {
  baseUrl: string;
  workflowId: string;
  mode: EndpointMode;
  customUrl?: string;
}

export interface CandidateFormData {
  name: string;
  email: string;
  file: File | null;
  targetRole: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  targetKeywords: string;
  notes: string;
}

export interface SubmissionRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  fileName: string;
  fileSize: number;
  targetRole: string;
  status: 'success' | 'failed' | 'processing';
  endpointUsed: string;
  responseStatus?: number;
  responseSummary?: string;
  atsScore?: number;
}

export interface AtsAnalysisResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  impactScore: number;
  brevityScore: number;
  skillsScore: number;
  structureScore: number;
  detectedSkills: string[];
  missingCrucials: string[];
  actionVerbsCount: number;
  quantifiedBulletPoints: number;
  strengths: string[];
  recommendations: string[];
}

export interface SampleResume {
  id: string;
  name: string;
  email: string;
  role: string;
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  fileName: string;
  keywords: string;
  content: string;
}
