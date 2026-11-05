import { Achievement } from '@/types/achievement';

export const demoAchievements: Achievement[] = [
  {
    id: 'achieve-prw-wild-report',
    title: 'PRW-Wild Telemetry & Spatial Digital Twin Verification Report',
    issuingOrganization: 'PRW-Wild Engineering Audit',
    category: 'Project verification reports',
    date: '2026-10-15',
    description: 'Formal automated test execution report recording 54 passing verification tests out of 54 across FastAPI telemetry endpoints, ESP32-S3 alert state machines, and 3D coordinate mapping.',
    publicationStatus: 'Published',
    verificationUrl: '',
    documentUrl: '/documents/PRW-Wild-Verification-Report.pdf',
    documentType: 'report',
    documentName: 'PRW-Wild-Verification-Report-54Tests.pdf',
    documentSize: '248 KB',
    createdAt: '2026-10-15T21:00:00Z',
    updatedAt: '2026-10-16T00:00:00Z'
  },
  {
    id: 'achieve-apaar-spec',
    title: 'APAAR ID Platform Architectural Specification & Ingestion Rules',
    issuingOrganization: 'Department of ECE, TCE Madurai',
    category: 'Technical documentation',
    date: '2026-10-23',
    description: 'Technical document defining data validation pipelines, duplicate record detection algorithms, and quota verification models for academic institution student databases.',
    publicationStatus: 'Draft', // Hidden from public visitors by default, visible in Admin to demonstrate publication toggle
    verificationUrl: '',
    documentUrl: '/documents/APAAR-ID-Architecture-Draft.pdf',
    documentType: 'pdf',
    documentName: 'APAAR-ID-Architecture-Draft.pdf',
    documentSize: '412 KB',
    createdAt: '2026-10-23T19:42:00Z',
    updatedAt: '2026-10-24T10:00:00Z'
  },
  {
    id: 'achieve-sih-mastitis-proposal',
    title: 'SIH 2026: Bovine Mastitis Early Forecasting Concept Document',
    issuingOrganization: 'Smart India Hackathon 2026 Problem Exploration',
    category: 'Competition-related documents',
    date: '2026-09-28',
    description: 'Comprehensive research and problem proposal analyzing non-invasive sensory metrics for subclinical mastitis prediction in dairy herds.',
    publicationStatus: 'Private', // Kept private to demonstrate private classification in admin
    verificationUrl: '',
    documentUrl: '',
    documentType: 'pdf',
    documentName: 'SIH2026-Mastitis-Research-Summary.pdf',
    documentSize: '1.2 MB',
    createdAt: '2026-09-28T14:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z'
  }
];
