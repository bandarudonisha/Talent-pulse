import React from 'react';
import { CheckCircle2, AlertOctagon, HelpCircle, FileCheck, Layers, Sparkles } from 'lucide-react';

export const AtsTipsGuide: React.FC = () => {
  const dos = [
    {
      title: 'Standard Section Headings',
      desc: 'Use recognized titles such as "Work Experience", "Education", "Skills", and "Certifications" so ATS parsers properly categorize your history.',
    },
    {
      title: 'Quantify Accomplishments',
      desc: 'Pair strong action verbs with measurable results (e.g., "Increased sales by 35% across 4 quarters" rather than "Responsible for sales").',
    },
    {
      title: 'Keyword Density & Job Alignment',
      desc: 'Incorporate relevant industry technologies, programming languages, and domain methodologies directly mentioned in the target job spec.',
    },
    {
      title: 'Clean Single-Column Hierarchy',
      desc: 'Single-column layouts parse with 99.4% accuracy across modern parsers, avoiding text-flow scrambling common in complex multi-column designs.',
    },
  ];

  const donts = [
    {
      title: 'Avoid Heavy Graphics & Icons',
      desc: 'Photos, raster graphics, progress bars, and decorative icons can distort parser coordinates or result in rejected files.',
    },
    {
      title: 'No Tables or Floating Text Boxes',
      desc: 'Text inside floating canvas shapes or non-standard nested tables is frequently skipped by legacy parser engines.',
    },
    {
      title: 'Do Not Stuff Hidden White Text',
      desc: 'Modern ATS filters detect micro-font or hidden text manipulation and automatically flag the application for disqualification.',
    },
    {
      title: 'Avoid Unstandardized Acronyms',
      desc: 'Spell out critical certifications or skills at least once before abbreviating (e.g., "Amazon Web Services (AWS)").',
    },
  ];

  return (
    <section id="ats-guide" className="py-16 md:py-20 border-t border-slate-900 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          {/* Zero-Pill Quiet Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <span>ATS Parser Compliance</span>
            <span aria-hidden="true">·</span>
            <span>Applicant Tracking Systems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            ATS Best Practices & Guidelines
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            How modern automated hiring engines (Workday, Greenhouse, Taleo) parse and rank incoming resume documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dos */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">Recommended Best Practices</h3>
            </div>
            <div className="space-y-4">
              {dos.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <AlertOctagon className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-semibold text-white">Common Parsing Pitfalls</h3>
            </div>
            <div className="space-y-4">
              {donts.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-xs font-semibold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
