'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wrench, Plus, Search, Filter, Trash2, Edit3, 
  CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Cpu, Activity
} from 'lucide-react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { fetchMachines, addMachine, updateMachineStatus, deleteMachine, FactoryMachine, MachineStatus } from '@/lib/services/machine-service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';

export default function AdminMachinesPage() {
  const [machines, setMachines] = useState<FactoryMachine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Hydraulic Press');
  const [manufacturer, setManufacturer] = useState('Bosch Rexroth');
  const [model, setModel] = useState('HP-4000');
  const [zone, setZone] = useState('Zone A - Heavy Stamping');
  const [params, setParams] = useState('Pressure: 4.2 bar | Temp: 65°C');
  const [interval, setInterval] = useState('500 Hours');
  const [notes, setNotes] = useState('');

  const loadMachines = async () => {
    setIsLoading(true);
    const data = await fetchMachines();
    setMachines(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMachines();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;

    const newM = await addMachine({
      machine_code: code,
      name,
      machine_type: type,
      manufacturer,
      model,
      location_zone: zone,
      installation_date: new Date().toISOString().split('T')[0],
      status: 'Operational',
      operating_parameters: params,
      maintenance_interval: interval,
      notes,
    });

    setMachines([newM, ...machines]);
    setIsAddOpen(false);
    setCode('');
    setName('');
  };

  const handleStatusChange = async (id: string, status: MachineStatus) => {
    setMachines(machines.map(m => m.id === id ? { ...m, status } : m));
    await updateMachineStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    await deleteMachine(id);
  };

  const filtered = machines.filter(m => {
    const matchesSearch = m.machine_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.location_zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const operationalCount = machines.filter(m => m.status === 'Operational').length;
  const maintenanceCount = machines.filter(m => m.status === 'Maintenance').length;
  const warningCount = machines.filter(m => m.status === 'Warning' || m.status === 'Offline').length;

  const renderStatusBadge = (status: MachineStatus) => {
    switch (status) {
      case 'Operational':
        return <Badge variant="indexed" dot>OPERATIONAL</Badge>;
      case 'Maintenance':
        return <Badge variant="processing" dot>MAINTENANCE</Badge>;
      case 'Warning':
        return <Badge variant="orange" dot>WARNING</Badge>;
      case 'Offline':
        return <Badge variant="failed" dot>OFFLINE</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-industrial-950 text-industrial-100 overflow-hidden font-sans bg-grid-pattern">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Wrench className="w-6 h-6 text-accent-orange" />
              Machine Inventory & Equipment Management
            </h1>
            <p className="text-xs font-mono text-industrial-400 mt-1">
              Configure plant floor machinery parameters, maintenance schedules, and telemetry status.
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Add New Machine
          </Button>
        </div>

        {/* Machine Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card accentBorder>
            <div className="text-xs font-mono uppercase text-industrial-400">Total Machinery</div>
            <div className="text-3xl font-bold font-mono text-white mt-2">{machines.length}</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Registered in Plant</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">Operational</div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">{operationalCount}</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Active Production</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">In Maintenance</div>
            <div className="text-3xl font-bold font-mono text-blue-400 mt-2">{maintenanceCount}</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Scheduled Service</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">Warnings / Offline</div>
            <div className="text-3xl font-bold font-mono text-amber-400 mt-2">{warningCount}</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Telemetry Alert</div>
          </Card>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-industrial-900 p-3 rounded-lg border border-industrial-800">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by Code (M-01), Name, or Zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-3.5 h-3.5" />}
              className="text-xs bg-industrial-950"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['ALL', 'Operational', 'Maintenance', 'Warning', 'Offline'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors uppercase ${
                  statusFilter === st
                    ? 'bg-industrial-700 text-white font-bold border border-industrial-600'
                    : 'bg-industrial-950 text-industrial-400 hover:text-white border border-industrial-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Machines Table */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-lg overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-industrial-200">
              <thead className="bg-industrial-950 text-[11px] font-mono text-industrial-400 uppercase tracking-wider border-b border-industrial-800">
                <tr>
                  <th className="px-4 py-3">Machine Code</th>
                  <th className="px-4 py-3">Name & Model</th>
                  <th className="px-4 py-3">Location Zone</th>
                  <th className="px-4 py-3">Operating Parameters</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800/60">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center font-mono text-industrial-400">
                      Loading machine inventory...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center font-mono text-industrial-500">
                      No machines matching criteria
                    </td>
                  </tr>
                ) : (
                  filtered.map((m) => (
                    <tr key={m.id} className="hover:bg-industrial-850/60 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-accent-orange">{m.machine_code}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{m.name}</div>
                        <div className="text-[10px] text-industrial-400 font-mono">
                          {m.manufacturer} | {m.model}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-industrial-300">{m.location_zone}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-industrial-400 truncate max-w-[220px]">
                        {m.operating_parameters || 'Nominal'}
                      </td>
                      <td className="px-4 py-3">{renderStatusBadge(m.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={m.status}
                            onChange={(e) => handleStatusChange(m.id, e.target.value as MachineStatus)}
                            className="bg-industrial-950 border border-industrial-700 text-[10px] font-mono text-industrial-300 rounded px-1.5 py-1 focus:outline-none"
                          >
                            <option value="Operational">Operational</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Warning">Warning</option>
                            <option value="Offline">Offline</option>
                          </select>

                          <button
                            onClick={() => handleDelete(m.id)}
                            className="p-1 rounded hover:bg-red-950 text-industrial-400 hover:text-red-400"
                            title="Delete Machine"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Machine Modal */}
      <Dialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Machinery Entry to Inventory"
        description="Register plant equipment and parameters for FactoryGPT tracking"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-industrial-300 block mb-1">Machine Code (e.g. M-06)</label>
              <Input value={code} onChange={e => setCode(e.target.value)} required />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1">Machine Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-industrial-300 block mb-1">Manufacturer</label>
              <Input value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1">Model Number</label>
              <Input value={model} onChange={e => setModel(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-industrial-300 block mb-1">Location Zone</label>
            <Input value={zone} onChange={e => setZone(e.target.value)} />
          </div>

          <div>
            <label className="text-industrial-300 block mb-1">Operating Parameters (Pressure/Temp/RPM)</label>
            <Input value={params} onChange={e => setParams(e.target.value)} />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Machinery Entry</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
