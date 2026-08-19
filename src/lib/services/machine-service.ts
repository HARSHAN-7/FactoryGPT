import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export type MachineStatus = 'Operational' | 'Maintenance' | 'Offline' | 'Warning';

export interface FactoryMachine {
  id: string;
  machine_code: string;
  name: string;
  machine_type: string;
  manufacturer: string;
  model: string;
  location_zone: string;
  installation_date: string;
  status: MachineStatus;
  operating_parameters?: string;
  maintenance_interval?: string;
  notes?: string;
  created_at: string;
}

export const INITIAL_MACHINES: FactoryMachine[] = [
  {
    id: 'm-uuid-001',
    machine_code: 'M-01',
    name: 'Hydraulic Press Pump Unit 4000',
    machine_type: 'Hydraulic Press',
    manufacturer: 'Bosch Rexroth',
    model: 'HP-4000-V3',
    location_zone: 'Zone A - Heavy Stamping',
    installation_date: '2024-03-15',
    status: 'Operational',
    operating_parameters: 'Pressure: 4.2 bar | Temp: 65°C | Oil: ISO VG 46',
    maintenance_interval: '500 Operating Hours (Every 60 Days)',
    notes: 'Requires Mobil DTE 25 Ultra fluid refill during maintenance cycles.',
    created_at: '2024-03-15T08:00:00Z',
  },
  {
    id: 'm-uuid-002',
    machine_code: 'CNC-05',
    name: '5-Axis Precision Milling Machine',
    machine_type: 'CNC Milling',
    manufacturer: 'Haas Automation',
    model: 'UMC-750',
    location_zone: 'Zone B - Precision Machining',
    installation_date: '2025-01-10',
    status: 'Maintenance',
    operating_parameters: 'Spindle: 12,000 RPM | Feed: 25 m/min',
    maintenance_interval: '250 Operating Hours',
    notes: 'Tool changer arm alignment check scheduled for today.',
    created_at: '2025-01-10T09:30:00Z',
  },
  {
    id: 'm-uuid-003',
    machine_code: 'B-10',
    name: 'High Pressure Industrial Boiler Unit',
    machine_type: 'Steam Boiler',
    manufacturer: 'Cleaver-Brooks',
    model: 'CB-700-150',
    location_zone: 'Zone C - Utilities Plant',
    installation_date: '2023-11-20',
    status: 'Operational',
    operating_parameters: 'Pressure: 12.5 bar | Steam Output: 5000 kg/hr',
    maintenance_interval: 'Monthly Safety Valve Test',
    notes: 'Annual OSHA inspection passed on June 2026.',
    created_at: '2023-11-20T11:15:00Z',
  },
  {
    id: 'm-uuid-004',
    machine_code: 'ROBOT-02',
    name: '6-Axis Robotic Welding Arm',
    machine_type: 'Welding Automation',
    manufacturer: 'FANUC',
    model: 'M-20iD/25',
    location_zone: 'Zone A - Chassis Assembly',
    installation_date: '2025-06-01',
    status: 'Warning',
    operating_parameters: 'Payload: 25 kg | Reach: 1831 mm',
    maintenance_interval: '1000 Hours Joint Grease Cycle',
    notes: 'Joint 3 servo thermal warning reported during shift 2.',
    created_at: '2025-06-01T14:00:00Z',
  },
];

let fallbackMachines: FactoryMachine[] = [...INITIAL_MACHINES];

export async function fetchMachines(): Promise<FactoryMachine[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('factory_machines')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as FactoryMachine[];
      }
    } catch (e) {
      console.warn('Supabase fetchMachines warning:', e);
    }
  }

  return fallbackMachines;
}

export async function addMachine(machineData: Omit<FactoryMachine, 'id' | 'created_at'>): Promise<FactoryMachine> {
  const newMachine: FactoryMachine = {
    ...machineData,
    id: `m-uuid-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('factory_machines')
        .insert(newMachine)
        .select()
        .single();

      if (!error && data) {
        return data as FactoryMachine;
      }
    } catch (e) {
      console.warn('Supabase addMachine warning:', e);
    }
  }

  fallbackMachines = [newMachine, ...fallbackMachines];
  return newMachine;
}

export async function updateMachineStatus(id: string, newStatus: MachineStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('factory_machines')
        .update({ status: newStatus })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase updateMachineStatus error:', e);
    }
  }

  fallbackMachines = fallbackMachines.map((m) =>
    m.id === id ? { ...m, status: newStatus } : m
  );
  return true;
}

export async function deleteMachine(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('factory_machines').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteMachine error:', e);
    }
  }

  fallbackMachines = fallbackMachines.filter((m) => m.id !== id);
  return true;
}
