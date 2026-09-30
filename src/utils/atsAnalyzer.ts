import { AtsAnalysisResult } from '../types';

const COMMON_ACTION_VERBS = [
  'architected', 'spearheaded', 'engineered', 'optimized', 'designed', 'developed',
  'implemented', 'deployed', 'orchestrated', 'streamlined', 'mentored', 'directed',
  'launched', 'automated', 'scaled', 'accelerated', 'transformed', 'reduced', 'increased',
  'delivered', 'negotiated', 'formulated', 'pioneered', 'established'
];

const TECH_SKILLS_KEYWORDS = [
  'javascript', 'typescript', 'react', 'next.js', 'vue', 'node.js', 'express', 'python',
  'golang', 'java', 'c++', 'rust', 'sql', 'postgresql', 'mongodb', 'redis', 'aws', 'gcp',
  'azure', 'docker', 'kubernetes', 'ci/cd', 'git', 'terraform', 'graphql', 'rest api',
  'microservices', 'agile', 'scrum', 'system design', 'machine learning', 'pytorch',
  'tensorflow', 'llm', 'rag', 'data pipelines', 'etl', 'tailwind', 'html5', 'css3'
];

export function analyzeResumeContent(
  textContent: string,
  targetRole: string = '',
  targetKeywords: string = ''
): AtsAnalysisResult {
  const normalized = textContent.toLowerCase();

  // 1. Action verbs detection
  let actionVerbsFound = 0;
  COMMON_ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    const matches = textContent.match(regex);
    if (matches) {
      actionVerbsFound += matches.length;
    }
  });

  // 2. Quantification / Metric check (e.g., $100k, 40%, 15,000, 3x)
  const metricRegex = /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?[kmb]?|\b\d+x\b|\b\d{2,}\+?\s*(users|clients|customers|requests|queries|downloads|qps|ms|seconds|minutes|hours|days|weeks|months|years))/gi;
  const metricsFound = (textContent.match(metricRegex) || []).length;

  // 3. Technical & Professional Skills detection
  const detectedSkills: string[] = [];
  TECH_SKILLS_KEYWORDS.forEach(skill => {
    if (normalized.includes(skill)) {
      detectedSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  // Also include any explicitly provided target keywords if found
  if (targetKeywords) {
    const customList = targetKeywords.split(/[,;\n]/).map(k => k.trim()).filter(Boolean);
    customList.forEach(k => {
      if (normalized.includes(k.toLowerCase()) && !detectedSkills.map(s => s.toLowerCase()).includes(k.toLowerCase())) {
        detectedSkills.push(k);
      }
    });
  }

  // 4. Section structure detection
  const hasContact = /(@|\bemail\b|\bphone\b|\bgithub\b|\blinkedin\b)/i.test(textContent);
  const hasExperience = /(experience|work history|employment|career)/i.test(textContent);
  const hasEducation = /(education|university|college|b\.s|b\.a|m\.s|ph\.d|degree)/i.test(textContent);
  const hasSkills = /(skills|technologies|proficiencies|competencies)/i.test(textContent);

  let structureScore = 0;
  if (hasContact) structureScore += 25;
  if (hasExperience) structureScore += 30;
  if (hasEducation) structureScore += 20;
  if (hasSkills) structureScore += 25;

  // 5. Impact score based on metrics and action verbs
  let impactScore = Math.min(100, Math.round((actionVerbsFound * 5) + (metricsFound * 12)));
  if (impactScore < 40 && textContent.length > 200) impactScore = 55;

  // 6. Brevity & density score
  const wordCount = textContent.trim().split(/\s+/).length;
  let brevityScore = 80;
  if (wordCount >= 250 && wordCount <= 750) {
    brevityScore = 95;
  } else if (wordCount > 750 && wordCount <= 1200) {
    brevityScore = 85;
  } else if (wordCount < 150) {
    brevityScore = 45;
  }

  // 7. Skills score
  let skillsScore = Math.min(100, Math.round((detectedSkills.length / 10) * 100));
  if (skillsScore < 50 && detectedSkills.length >= 3) skillsScore = 65;

  // Overall weighted composite score
  const overall = Math.round(
    impactScore * 0.35 +
    structureScore * 0.25 +
    skillsScore * 0.25 +
    brevityScore * 0.15
  );

  const finalScore = Math.max(30, Math.min(99, overall));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'B';
  if (finalScore >= 92) grade = 'A+';
  else if (finalScore >= 85) grade = 'A';
  else if (finalScore >= 72) grade = 'B';
  else if (finalScore >= 60) grade = 'C';
  else grade = 'D';

  const strengths: string[] = [];
  const recommendations: string[] = [];
  const missingCrucials: string[] = [];

  if (metricsFound >= 3) {
    strengths.push(`Strong quantification: Detected ${metricsFound} quantifiable performance outcomes.`);
  } else {
    recommendations.push('Incorporate more quantified metrics (e.g., %, $ amounts, efficiency improvements) to strengthen impact.');
  }

  if (actionVerbsFound >= 5) {
    strengths.push(`Excellent active voice: Detected ${actionVerbsFound} strong action leadership verbs.`);
  } else {
    recommendations.push('Replace passive phrases with strong executive action verbs like "Architected", "Spearheaded", "Scaled".');
  }

  if (detectedSkills.length >= 6) {
    strengths.push(`Rich skill density: Identified ${detectedSkills.length} industry-standard technical competencies.`);
  } else {
    recommendations.push('Highlight relevant technical tools, cloud architectures, and languages matching job descriptions.');
  }

  if (!hasEducation) {
    missingCrucials.push('Education Section');
    recommendations.push('Ensure an explicit Education heading is detectable by ATS parsers.');
  }
  if (!hasContact) {
    missingCrucials.push('Complete Contact Information');
  }

  return {
    score: finalScore,
    grade,
    impactScore,
    brevityScore,
    skillsScore,
    structureScore,
    detectedSkills: detectedSkills.slice(0, 16),
    missingCrucials,
    actionVerbsCount: actionVerbsFound,
    quantifiedBulletPoints: metricsFound,
    strengths,
    recommendations
  };
}
