export interface SafetyEvaluation {
  isHighRisk: boolean;
  hazardCategory?: 'High Voltage Electrical' | 'High Pressure Vessel' | 'Toxic/Chemical Hazard' | 'Heavy Machine Pinch Point';
  safetyWarningBanner?: string;
}

const HAZARD_KEYWORDS = [
  { keyword: 'voltage', category: 'High Voltage Electrical' },
  { keyword: 'breaker', category: 'High Voltage Electrical' },
  { keyword: 'pressure', category: 'High Pressure Vessel' },
  { keyword: 'boiler', category: 'High Pressure Vessel' },
  { keyword: 'chemical', category: 'Toxic/Chemical Hazard' },
  { keyword: 'acid', category: 'Toxic/Chemical Hazard' },
  { keyword: 'hydraulic', category: 'Heavy Machine Pinch Point' },
  { keyword: 'lockout', category: 'High Voltage Electrical' },
  { keyword: 'loto', category: 'High Voltage Electrical' },
];

export function evaluateSafetyGuardrails(query: string, isGrounded: boolean): SafetyEvaluation {
  const q = query.toLowerCase();
  const matched = HAZARD_KEYWORDS.find(h => q.includes(h.keyword));

  if (!matched) {
    return { isHighRisk: false };
  }

  const category = matched.category as any;

  let warning = `⚠️ MANDATORY EHS INDUSTRIAL SAFETY WARNING [Category: ${category}]: Ensure all Lockout/Tagout (LOTO) protocols and PPE gear are verified prior to physical operation.`;

  if (!isGrounded) {
    warning += `\nCRITICAL AUDIT NOTICE: Authoritative SOP manual not indexed for this query. Do NOT attempt maintenance without verified engineering procedures.`;
  }

  return {
    isHighRisk: true,
    hazardCategory: category,
    safetyWarningBanner: warning,
  };
}
