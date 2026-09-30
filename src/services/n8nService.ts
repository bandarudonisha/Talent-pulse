import { EndpointConfig, EndpointMode, SubmissionRecord } from '../types';

export const DEFAULT_CONFIG: EndpointConfig = {
  baseUrl: 'https://nishabandaru.app.n8n.cloud',
  workflowId: 'a8b86a7c-eb0a-47ad-ae8a-8b3ad48bff96',
  mode: 'production',
};

const STORAGE_KEY_CONFIG = 'n8n_resume_analyzer_config_v1';
const STORAGE_KEY_HISTORY = 'n8n_resume_analyzer_history_v1';

export function getStoredConfig(): EndpointConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Failed to read config from localStorage', err);
  }
  return DEFAULT_CONFIG;
}

export function saveConfig(config: EndpointConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save config to localStorage', err);
  }
}

export function computeEndpointUrl(config: EndpointConfig): string {
  if (config.customUrl && config.customUrl.trim().length > 0) {
    return config.customUrl.trim();
  }
  const cleanBase = config.baseUrl.replace(/\/+$/, '');
  const path = config.mode === 'test' ? 'form-test' : 'form';
  return `${cleanBase}/${path}/${config.workflowId}`;
}

export function getSubmissionHistory(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to read history from localStorage', err);
  }
  return [];
}

export function saveSubmissionRecord(record: SubmissionRecord): void {
  try {
    const current = getSubmissionHistory();
    const updated = [record, ...current].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save submission history', err);
  }
}

export function clearSubmissionHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (err) {
    console.warn('Failed to clear submission history', err);
  }
}

export interface SubmitPayload {
  name: string;
  email: string;
  file: File;
  targetRole?: string;
  experienceLevel?: string;
  targetKeywords?: string;
  notes?: string;
}

export interface SubmissionResponse {
  ok: boolean;
  status: number;
  message: string;
  rawText?: string;
  isTestNotice?: boolean;
}

export async function submitResumeToN8n(
  config: EndpointConfig,
  payload: SubmitPayload
): Promise<SubmissionResponse> {
  const url = computeEndpointUrl(config);

  const formData = new FormData();
  // Standard n8n form trigger fields
  formData.append('field-0', payload.name.trim());
  formData.append('field-1', payload.email.trim());
  formData.append('field-2', payload.file, payload.file.name);

  // Optional contextual metadata
  if (payload.targetRole) {
    formData.append('target_role', payload.targetRole);
  }
  if (payload.experienceLevel) {
    formData.append('experience_level', payload.experienceLevel);
  }
  if (payload.targetKeywords) {
    formData.append('target_keywords', payload.targetKeywords);
  }
  if (payload.notes) {
    formData.append('candidate_notes', payload.notes);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const text = await response.text();

    // Check if n8n returned the "Form Trigger isn't listening yet" test message
    const isTestNotice =
      text.includes("Form Trigger isn't listening yet") ||
      text.includes("Click the \"Execute step\" button");

    if (isTestNotice) {
      return {
        ok: false,
        status: response.status,
        message: 'Your n8n workflow is in test mode and waiting for trigger execution. In your n8n workflow editor, click "Test step" on the Form Trigger node, then submit again!',
        rawText: text,
        isTestNotice: true,
      };
    }

    if (response.ok) {
      let parsedMessage = 'Resume submitted successfully to n8n workflow!';
      try {
        const json = JSON.parse(text);
        if (json.formSubmittedText) {
          parsedMessage = json.formSubmittedText;
        } else if (json.status === 200 || json.message) {
          parsedMessage = json.message || 'Workflow executed successfully (Status 200).';
        }
      } catch {
        // Not JSON, check for plain text
        if (text && !text.includes('<!DOCTYPE html>')) {
          parsedMessage = text.slice(0, 300);
        }
      }

      return {
        ok: true,
        status: response.status,
        message: parsedMessage,
        rawText: text,
      };
    } else {
      return {
        ok: false,
        status: response.status,
        message: `n8n server returned HTTP ${response.status}: ${response.statusText || 'Error processing request'}`,
        rawText: text,
      };
    }
  } catch (error: any) {
    return {
      ok: false,
      status: 0,
      message: error?.message || 'Network error: Unable to connect to n8n cloud endpoint.',
    };
  }
}

export async function pingN8nEndpoint(config: EndpointConfig): Promise<{
  online: boolean;
  statusText: string;
  latencyMs: number;
  isTestNotice?: boolean;
}> {
  const start = performance.now();
  const url = computeEndpointUrl(config);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'text/html,application/json' },
    });
    const latencyMs = Math.round(performance.now() - start);
    const text = await res.text();

    const isTestNotice = text.includes("Form Trigger isn't listening yet");

    if (isTestNotice) {
      return {
        online: true,
        statusText: 'Connected (Test Mode - Awaiting execution step)',
        latencyMs,
        isTestNotice: true,
      };
    }

    if (res.ok) {
      return {
        online: true,
        statusText: 'Active & Listening (Production Mode)',
        latencyMs,
      };
    }

    return {
      online: false,
      statusText: `HTTP ${res.status}: ${res.statusText}`,
      latencyMs,
    };
  } catch (err: any) {
    return {
      online: false,
      statusText: err?.message || 'Connection failed',
      latencyMs: Math.round(performance.now() - start),
    };
  }
}
