# FactoryGPT — AI Intelligence for the Modern Factory

FactoryGPT is an enterprise-grade AI assistant platform engineered for manufacturing plants, equipment maintenance teams, EHS safety officers, and plant operations. It converts static factory manuals, Standard Operating Procedures (SOPs), safety protocols, and tabular CSV production datasets into conversational intelligence.

> **Production Hardening Status**: 100% Complete across all 7 Phases (UI/UX, Supabase Database & Storage, Vector RAG Pipeline, Multilingual English/Tamil/Hindi, Hands-Free Voice Assistant, Machine Management & Intelligence Analytics, and Vercel Deployment Readiness).

---

## 🌟 Key Capabilities & Feature Matrix

| Feature Module | Technical Capabilities |
| :--- | :--- |
| **Industrial UI/UX** | Dark engineering control aesthetic, high-density dashboard, status LEDs, grid background pattern, responsive drawers for mobile & tablet (320px–1920px). |
| **Document Ingestion** | Multi-format parsers (PDF, DOCX, TXT, CSV, XLSX) with strict file validation (type check, size limit 50MB, 0-byte empty file detection). |
| **Supabase pgvector RAG** | Document parsing → 500-token chunking with 50-token overlap → Gemini `text-embedding-004` (768-D) → Supabase `pgvector` Cosine Similarity search (`TOP_K = 4`, `Threshold = 0.50`). |
| **Anti-Hallucination** | Low-temperature Gemini 1.5 Flash grounded prompt. Answers strictly from retrieved manual chunks and explicit citation formatting (`[DocumentName, Page X]`). |
| **Multilingual Engine** | Single shared vector database supporting **English**, **Tamil (தமிழ்)**, and **Hindi (हिन्दी)**. Script auto-detection with technical identifier preservation (`Machine M-102`, `220 V`, `50 Hz`, `500 RPM`, `LOTO-#402`). |
| **Voice AI Assistant** | Hands-free Speech-to-Text (STT) & Neural Text-to-Speech (TTS) via Web Speech API in English (`en-US`), Tamil (`ta-IN`), and Hindi (`hi-IN`). |
| **Machine Inventory** | Equipment management (`/admin/machines`) tracking Machine Code, Type, Manufacturer, Model, Zone, Operating Parameters, Maintenance Interval, and Status (`Operational`, `Maintenance`, `Warning`, `Offline`). |
| **Tabular Analytics** | Programmatic math calculation engine for spreadsheet queries (*"Which machine had the highest downtime?"*, *"Compare Line 1 and Line 2"*). |
| **Safety Guardrails** | High-risk industrial operation keyword detector with mandatory EHS warning alerts and audit logging. |

---

## 🛠️ Architecture & Folder Structure

```
FINALYEAR-PHASE 1/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout, theme provider & SEO metadata
│   │   ├── page.tsx                  # Landing Page (Hero, Capabilities, How it works, Use cases, CTA)
│   │   ├── chat/
│   │   │   └── page.tsx              # Interactive Chat Interface (/chat)
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin Dashboard (/admin)
│   │   │   ├── machines/page.tsx     # Machine Inventory (/admin/machines)
│   │   │   ├── documents/page.tsx    # Document Storage (/admin/documents)
│   │   │   ├── knowledge-base/page.tsx # Knowledge Base Health & Vector Store (/admin/knowledge-base)
│   │   │   └── analytics/page.tsx    # AI Analytics & Query Telemetry (/admin/analytics)
│   │   ├── settings/page.tsx         # System & Theme Settings (/settings)
│   │   ├── api/chat/route.ts         # Production RAG Chat API Endpoint (POST /api/chat)
│   │   ├── robots.ts                 # Crawler directives
│   │   └── sitemap.ts                # Dynamic XML sitemap
│   ├── components/
│   │   ├── ui/                       # Base UI primitives (Button, Card, Badge, Input, Dialog)
│   │   ├── layout/                   # LandingNav, AdminSidebar, Header components
│   │   ├── chat/                     # ChatSidebar, ChatTopBar, SuggestedPrompts, VoiceControlModal
│   │   ├── documents/                # DocumentTable, UploadModal
│   │   └── auth-provider.tsx         # Supabase Auth Session Provider
│   └── lib/
│       ├── parsers/                  # Modular File Parsers (PDF, DOCX, TXT, CSV, XLSX)
│       ├── chunking/                 # Chunker Engine (500 tokens / 50 overlap with metadata)
│       ├── embeddings/               # Gemini text-embedding-004 Provider Abstraction
│       ├── retrieval/                # Supabase pgvector Similarity Search RPC
│       ├── rag/                      # Grounded Anti-Hallucination RAG Generator
│       ├── i18n/                     # Language Detector (Script Range matcher for EN/TA/HI)
│       ├── voice/                    # Speech-to-Text & Speech Synthesis Manager
│       ├── intelligence/             # Intent Classifier, Safety Guardrails & Tabular Math Engine
│       ├── services/                 # Document & Machine CRUD Services
│       ├── supabase/                 # Client, Server, and Admin Service-Role Key Helpers
│       ├── validation.ts             # File Upload Validation Service
│       ├── types.ts                  # TypeScript Strict Types
│       └── mock-data.ts              # Fallback initial data streams
├── supabase/
│   └── schema.sql                    # Production PostgreSQL Schema & pgvector RPC Migration
├── public/                           # Static assets
├── .env.example                      # Environment variables template
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Industrial design system palette & typography
├── tsconfig.json                     # TypeScript strict configuration
├── vercel.json                       # Vercel deployment configuration
└── package.json                      # Dependencies & scripts
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Prerequisites
- Node.js `v18.x` or higher
- Supabase project account (for PostgreSQL database & storage bucket)
- Google Gemini API Key (for LLM reasoning & vector embeddings)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-org/factorygpt.git
cd factorygpt
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase and Gemini credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GEMINI_API_KEY=your-google-gemini-api-key
```

### 4. Supabase Database Migration
Open your Supabase SQL Editor and execute the script inside `supabase/schema.sql`. This will:
1. Enable `uuid-ossp` and `vector` extensions.
2. Create database tables: `profiles`, `documents`, `document_chunks`, `conversations`, `messages`, `factory_machines`, `sop_documents`, `audit_logs`.
3. Create the pgvector similarity search RPC function `match_document_chunks`.
4. Initialize the `factory-documents` Storage Bucket with file size limits and MIME restrictions.
5. Set up Row Level Security (RLS) policies.

---

## 🚀 Running & Deploying

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Production Build & Type Check
```bash
npx tsc --noEmit
npm run build
npm run start
```

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`) in Vercel Project Settings.
4. Deploy!

---

## 🛡️ Security Audit Summary

- **Service-Role Key Security**: `SUPABASE_SERVICE_ROLE_KEY` is restricted to server-side execution (`src/lib/supabase/admin.ts`) and is never included in client bundle outputs.
- **Client Key Security**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is used for client-side authentication and RLS-protected queries.
- **File Validation**: Strict file type validation (`.pdf`, `.docx`, `.txt`, `.csv`, `.xlsx`), MIME verification, 50MB file size cap, and empty 0-byte file rejection in `src/lib/validation.ts`.
- **Anti-Hallucination**: System prompts restrict Gemini to retrieved manual context, returning explicit unavailable notices if context is insufficient.
