'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, MessageSquare, Languages, Wrench, 
  ShieldAlert, RefreshCw, Cpu, CheckCircle2, FileText 
} from 'lucide-react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { fetchDocuments } from '@/lib/services/document-service';
import { fetchMachines } from '@/lib/services/machine-service';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminAnalyticsPage() {
  const [docCount, setDocCount] = useState(0);
  const [machineCount, setMachineCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchDocuments(), fetchMachines()]).then(([docs, machines]) => {
      setDocCount(docs.length);
      setMachineCount(machines.length);
      setIsLoading(false);
    });
  }, []);

  const queryCategoryStats = [
    { name: 'Maintenance Engineering', percent: 38, count: 54 },
    { name: 'Safety & EHS SOPs', percent: 28, count: 40 },
    { name: 'Machine Specs & Manuals', percent: 18, count: 26 },
    { name: 'Production & CSV Data', percent: 11, count: 15 },
    { name: 'General Queries', percent: 5, count: 7 },
  ];

  const languageUsageStats = [
    { lang: 'English (en)', percent: 55, count: 78, native: 'English' },
    { lang: 'Tamil (ta)', percent: 28, count: 40, native: 'தமிழ்' },
    { lang: 'Hindi (hi)', percent: 17, count: 24, native: 'हिन्दी' },
  ];

  const topReferencedMachines = [
    { code: 'M-01', name: 'Hydraulic Press Pump Unit 4000', queryCount: 42, topTopic: 'Lubrication SOP' },
    { code: 'CNC-05', name: '5-Axis Precision Milling Machine', queryCount: 31, topTopic: 'Zero Point Calibration' },
    { code: 'B-10', name: 'High Pressure Steam Boiler', queryCount: 22, topTopic: 'Safety Valve Pressure' },
    { code: 'ROBOT-02', name: '6-Axis Robotic Welding Arm', queryCount: 16, topTopic: 'Joint Servo Overheating' },
  ];

  return (
    <div className="flex h-screen bg-industrial-950 text-industrial-100 overflow-hidden font-sans bg-grid-pattern">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-accent-orange" />
              Factory GPT AI Analytics & Query Telemetry
            </h1>
            <p className="text-xs font-mono text-industrial-400 mt-1">
              Track query intents, multilingual language distribution, machine reference metrics, and audit logs.
            </p>
          </div>

          <Badge variant="indexed" dot>
            ANALYTICS ENGINE ONLINE
          </Badge>
        </div>

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card accentBorder>
            <div className="text-xs font-mono uppercase text-industrial-400">Total Queries Analyzed</div>
            <div className="text-3xl font-bold font-mono text-white mt-2">142</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">18 Questions Today</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">Avg Response Time</div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mt-2">1.24 s</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Supabase pgvector + Gemini</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">Grounded Citation Rate</div>
            <div className="text-3xl font-bold font-mono text-white mt-2">96.8%</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Zero Hallucination Guarded</div>
          </Card>

          <Card>
            <div className="text-xs font-mono uppercase text-industrial-400">Ungrounded / Missing Manuals</div>
            <div className="text-3xl font-bold font-mono text-amber-400 mt-2">4</div>
            <div className="text-[11px] text-industrial-400 mt-1 font-mono">Audit Logged for Ingestion</div>
          </Card>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Query Intent Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-orange" />
                Query Intent Categories
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 font-mono text-xs">
              {queryCategoryStats.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-industrial-300">
                    <span>{item.name}</span>
                    <span className="text-white font-bold">{item.count} ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-industrial-950 rounded-full overflow-hidden border border-industrial-800">
                    <div className="h-full bg-accent-orange" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Multilingual Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-400" />
                Multilingual Query Distribution
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 font-mono text-xs">
              {languageUsageStats.map((item) => (
                <div key={item.lang} className="space-y-1">
                  <div className="flex justify-between text-industrial-300">
                    <span>{item.lang} ({item.native})</span>
                    <span className="text-emerald-400 font-bold">{item.count} queries ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-industrial-950 rounded-full overflow-hidden border border-industrial-800">
                    <div className="h-full bg-emerald-500" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Most Referenced Machinery */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-4 h-4 text-accent-orange" />
            Most Referenced Equipment Manuals
          </h3>

          <div className="bg-industrial-900 border border-industrial-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs font-mono text-industrial-300">
              <thead className="bg-industrial-950 text-industrial-400 border-b border-industrial-800">
                <tr>
                  <th className="px-4 py-2.5">Machine Code</th>
                  <th className="px-4 py-2.5">Equipment Name</th>
                  <th className="px-4 py-2.5">Query Count</th>
                  <th className="px-4 py-2.5">Most Frequent Query Subject</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800">
                {topReferencedMachines.map((m) => (
                  <tr key={m.code}>
                    <td className="px-4 py-2.5 text-accent-orange font-bold">{m.code}</td>
                    <td className="px-4 py-2.5 text-white">{m.name}</td>
                    <td className="px-4 py-2.5 font-bold">{m.queryCount} queries</td>
                    <td className="px-4 py-2.5 text-industrial-400">{m.topTopic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
