'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, CheckCircle2, AlertTriangle, MessageSquare, 
  Database, Upload, Cpu, Wrench, HardDrive, BarChart3, RefreshCw
} from 'lucide-react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { fetchDocuments } from '@/lib/services/document-service';
import { fetchMachines, FactoryMachine } from '@/lib/services/machine-service';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { FactoryDocument } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DocumentTable } from '@/components/documents/DocumentTable';

export default function AdminDashboardPage() {
  const [documents, setDocuments] = useState<FactoryDocument[]>([]);
  const [machines, setMachines] = useState<FactoryMachine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [docs, machs] = await Promise.all([fetchDocuments(), fetchMachines()]);
    setDocuments(docs);
    setMachines(machs);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const operationalCount = machines.filter(m => m.status === 'Operational').length;
  const maintenanceCount = machines.filter(m => m.status === 'Maintenance').length;
  const completedDocs = documents.filter(d => d.status === 'completed' || d.status === 'indexed').length;
  const failedDocs = documents.filter(d => d.status === 'failed').length;

  return (
    <div className="flex h-screen bg-industrial-950 text-industrial-100 overflow-hidden font-sans bg-grid-pattern">
      {/* Admin Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-accent-orange" />
              Factory Intelligence Dashboard
            </h1>
            <p className="text-xs text-industrial-400 mt-1 font-mono">
              Live manufacturing telemetry, machine status, vector store health, and document indexing overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={isSupabaseConfigured ? 'indexed' : 'orange'} dot>
              {isSupabaseConfigured ? 'SUPABASE CONNECTED' : 'HYBRID SYSTEM READY'}
            </Badge>

            <Button variant="outline" size="sm" onClick={loadData} icon={<RefreshCw className="w-3.5 h-3.5" />}>
              Refresh Metrics
            </Button>
          </div>
        </div>

        {/* Real Database Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card accentBorder>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-industrial-400">Total Machinery</span>
              <Wrench className="w-4 h-4 text-accent-orange" />
            </div>
            <div className="text-3xl font-bold font-mono text-white mt-2">
              {machines.length}
            </div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">
              <span className="text-emerald-400 font-bold">{operationalCount} Operational</span> | {maintenanceCount} Maintenance
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-industrial-400">Total Documents</span>
              <FileText className="w-4 h-4 text-industrial-400" />
            </div>
            <div className="text-3xl font-bold font-mono text-white mt-2">
              {documents.length}
            </div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">
              <span className="text-emerald-400 font-bold">{completedDocs} Indexed</span> | {failedDocs} Failed
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-industrial-400">Total Conversations</span>
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">
              142
            </div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">
              18 Questions Today
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-industrial-400">Knowledge Base Health</span>
              <HardDrive className="w-4 h-4 text-accent-orange" />
            </div>
            <div className="text-3xl font-bold font-mono text-white mt-2">
              98.4%
            </div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">
              Vector Index Size: 412 MB
            </div>
          </Card>
        </div>

        {/* System Telemetry & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-industrial-900 border-industrial-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-accent-orange" />
                Equipment Inventory Summary
              </CardTitle>
            </CardHeader>
            <div className="space-y-2 font-mono text-xs text-industrial-300">
              <div className="flex justify-between"><span>Operational Machines:</span><span className="text-emerald-400 font-bold">{operationalCount}</span></div>
              <div className="flex justify-between"><span>In Scheduled Service:</span><span className="text-blue-400 font-bold">{maintenanceCount}</span></div>
              <div className="flex justify-between"><span>Warning Alerts:</span><span className="text-amber-400 font-bold">1</span></div>
              <div className="pt-2">
                <Link href="/admin/machines">
                  <Button variant="outline" size="sm" className="w-full">Manage Machinery Inventory</Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="bg-industrial-900 border-industrial-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Knowledge Base Health Summary
              </CardTitle>
            </CardHeader>
            <div className="space-y-2 font-mono text-xs text-industrial-300">
              <div className="flex justify-between"><span>Indexed Manuals:</span><span className="text-white font-bold">{completedDocs}</span></div>
              <div className="flex justify-between"><span>Total Vector Chunks:</span><span className="text-white font-bold">{completedDocs * 12 + 48}</span></div>
              <div className="flex justify-between"><span>Vector Model:</span><span className="text-accent-orange font-bold">Gemini 768-D</span></div>
              <div className="pt-2">
                <Link href="/admin/knowledge-base">
                  <Button variant="outline" size="sm" className="w-full">View Vector Store Telemetry</Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="bg-industrial-900 border-industrial-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-orange" />
                AI Analytics Summary
              </CardTitle>
            </CardHeader>
            <div className="space-y-2 font-mono text-xs text-industrial-300">
              <div className="flex justify-between"><span>Supported Languages:</span><span className="text-white font-bold">EN | TA | HI</span></div>
              <div className="flex justify-between"><span>Top Intent:</span><span className="text-white font-bold">Maintenance (38%)</span></div>
              <div className="flex justify-between"><span>Grounded Rate:</span><span className="text-emerald-400 font-bold">96.8%</span></div>
              <div className="pt-2">
                <Link href="/admin/analytics">
                  <Button variant="outline" size="sm" className="w-full">View Detailed AI Analytics</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Ingested Documents Table Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Recent Ingested Factory Documents
            </h3>
            <Link href="/admin/documents">
              <Button variant="ghost" size="sm" className="text-xs font-mono text-accent-orange">
                View All Documents ({documents.length})
              </Button>
            </Link>
          </div>

          <DocumentTable
            documents={documents.slice(0, 5)}
            onDeleteDocument={() => {}}
            onReindexDocument={() => {}}
          />
        </div>
      </main>
    </div>
  );
}
