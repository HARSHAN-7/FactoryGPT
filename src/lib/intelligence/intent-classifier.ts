export type QueryIntent = 
  | 'Maintenance'
  | 'Safety'
  | 'Machine Information'
  | 'SOP'
  | 'Production'
  | 'Inventory'
  | 'Troubleshooting'
  | 'General';

export function classifyQueryIntent(query: string): QueryIntent {
  const q = query.toLowerCase();

  if (q.includes('safety') || q.includes('lockout') || q.includes('loto') || q.includes('hazard') || q.includes('osha') || q.includes('ppe') || q.includes('emergency')) {
    return 'Safety';
  }

  if (q.includes('maintenance') || q.includes('lubricat') || q.includes('oil') || q.includes('filter') || q.includes('service') || q.includes('clean')) {
    return 'Maintenance';
  }

  if (q.includes('sop') || q.includes('procedure') || q.includes('steps') || q.includes('instruction') || q.includes('guide')) {
    return 'SOP';
  }

  if (q.includes('error') || q.includes('code') || q.includes('breakdown') || q.includes('fault') || q.includes('fix') || q.includes('troubleshoot') || q.includes('warning')) {
    return 'Troubleshooting';
  }

  if (q.includes('production') || q.includes('output') || q.includes('downtime') || q.includes('metrics') || q.includes('scrap') || q.includes('yield') || q.includes('line')) {
    return 'Production';
  }

  if (q.includes('machine') || q.includes('spec') || q.includes('manual') || q.includes('rpm') || q.includes('voltage') || q.includes('pressure') || q.includes('model')) {
    return 'Machine Information';
  }

  if (q.includes('stock') || q.includes('part') || q.includes('spare') || q.includes('inventory') || q.includes('quantity')) {
    return 'Inventory';
  }

  return 'General';
}
