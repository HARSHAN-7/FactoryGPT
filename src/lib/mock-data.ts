import { FactoryDocument, ChatConversation, ChatMessage, SystemMetrics } from './types';

export const INITIAL_DOCUMENTS: FactoryDocument[] = [
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01001',
    filename: 'Machine_M01_Lubrication_SOP_v3.pdf',
    original_filename: 'Machine_M01_Lubrication_SOP_v3.pdf',
    file_type: 'PDF',
    file_size: 4404019,
    storage_path: 'sops/Machine_M01_Lubrication_SOP_v3.pdf',
    status: 'completed',
    uploaded_by: 'Eng. Sarah Jenkins',
    created_at: '2026-08-15T10:30:00Z',
    updated_at: '2026-08-15T10:30:00Z',
    sizeFormatted: '4.2 MB',
    uploaderName: 'Eng. Sarah Jenkins'
  },
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01002',
    filename: 'Hydraulic_Pump_HP4000_Maintenance_Manual.pdf',
    original_filename: 'Hydraulic_Pump_HP4000_Maintenance_Manual.pdf',
    file_type: 'PDF',
    file_size: 19608576,
    storage_path: 'manuals/Hydraulic_Pump_HP4000_Maintenance_Manual.pdf',
    status: 'completed',
    uploaded_by: 'Lead Tech Alex Rivera',
    created_at: '2026-08-14T14:20:00Z',
    updated_at: '2026-08-14T14:20:00Z',
    sizeFormatted: '18.7 MB',
    uploaderName: 'Lead Tech Alex Rivera'
  },
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01003',
    filename: 'OSHA_Industrial_Safety_Protocol_2026.docx',
    original_filename: 'OSHA_Industrial_Safety_Protocol_2026.docx',
    file_type: 'DOCX',
    file_size: 1887436,
    storage_path: 'safety/OSHA_Industrial_Safety_Protocol_2026.docx',
    status: 'completed',
    uploaded_by: 'Safety Officer Marcus Vance',
    created_at: '2026-08-10T09:15:00Z',
    updated_at: '2026-08-10T09:15:00Z',
    sizeFormatted: '1.8 MB',
    uploaderName: 'Safety Officer Marcus Vance'
  },
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01004',
    filename: 'Factory_Floor_Q2_Production_Metrics.csv',
    original_filename: 'Factory_Floor_Q2_Production_Metrics.csv',
    file_type: 'CSV',
    file_size: 911360,
    storage_path: 'analytics/Factory_Floor_Q2_Production_Metrics.csv',
    status: 'completed',
    uploaded_by: 'Plant Manager David Chen',
    created_at: '2026-08-18T16:45:00Z',
    updated_at: '2026-08-18T16:45:00Z',
    sizeFormatted: '890 KB',
    uploaderName: 'Plant Manager David Chen'
  },
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01005',
    filename: 'CNC_5Axis_Milling_Operating_Guide.pdf',
    original_filename: 'CNC_5Axis_Milling_Operating_Guide.pdf',
    file_type: 'PDF',
    file_size: 13002342,
    storage_path: 'manuals/CNC_5Axis_Milling_Operating_Guide.pdf',
    status: 'processing',
    uploaded_by: 'Eng. Sarah Jenkins',
    created_at: '2026-08-19T11:05:00Z',
    updated_at: '2026-08-19T11:05:00Z',
    sizeFormatted: '12.4 MB',
    uploaderName: 'Eng. Sarah Jenkins'
  },
  {
    id: 'e4b9d012-70b1-4f81-9f93-547e2bf01006',
    filename: 'Boiler_Pressure_Sensor_Calibrations.xlsx',
    original_filename: 'Boiler_Pressure_Sensor_Calibrations.xlsx',
    file_type: 'XLSX',
    file_size: 3250585,
    storage_path: 'analytics/Boiler_Pressure_Sensor_Calibrations.xlsx',
    status: 'failed',
    uploaded_by: 'Tech Support Team',
    processing_error: 'Table header row corrupt or missing required columns.',
    created_at: '2026-08-18T18:00:00Z',
    updated_at: '2026-08-18T18:00:00Z',
    sizeFormatted: '3.1 MB',
    uploaderName: 'Tech Support Team'
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-01',
    title: 'Machine M-01 Maintenance & Lubrication',
    updatedAt: '10:42 AM',
    category: 'Maintenance',
    messageCount: 2
  },
  {
    id: 'conv-02',
    title: 'High-Voltage Lock-Out Tag-Out Procedure',
    updatedAt: 'Yesterday',
    category: 'Safety',
    messageCount: 6
  }
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-01': [
    {
      id: 'msg-1',
      sender: 'user',
      content: 'Explain the maintenance procedure for Machine M-01',
      timestamp: '10:40 AM'
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      content: `### Maintenance Procedure for Machine M-01 (Hydraulic Pump Unit)

Based on **Machine_M01_Lubrication_SOP_v3.pdf**:

1. **Pre-Maintenance Isolation**:
   - Engage emergency stop switch **E-01** on control panel A.
   - Verify zero-pressure status on pressure gauge **PG-201** (< 0.2 bar).
   - Apply Lockout/Tagout (LOTO) padlock #402.

2. **Lubrication Cycle Steps**:
   - Drain old ISO VG 46 hydraulic fluid from reservoir **R-101**.
   - Clean magnetic drain plug to remove ferrous debris.
   - Refill with 15.5 Liters of fresh Mobil DTE 25 Ultra until fluid level reaches sight line.`,
      timestamp: '10:41 AM',
      citations: [
        {
          documentId: 'e4b9d012-70b1-4f81-9f93-547e2bf01001',
          documentName: 'Machine_M01_Lubrication_SOP_v3.pdf',
          pageOrSection: 'Section 4.2',
          relevanceScore: 0.96
        }
      ]
    }
  ]
};

export const INITIAL_METRICS: SystemMetrics = {
  totalDocuments: 24,
  processedDocuments: 21,
  failedDocuments: 1,
  uploadingDocuments: 0,
  totalConversations: 142,
  knowledgeBaseHealth: 98.4,
  vectorIndexSizeMB: 412
};
