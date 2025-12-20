export type ViolationType = 'cigarette' | 'vape' | 'cake' | 'csd';
export type CameraStatus = 'online' | 'offline' | 'warning';
export type AlertStatus = 'new' | 'reviewed' | 'dismissed' | 'escalated';
export type CaseStatus = 'open' | 'under_review' | 'closed';

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  lastActive: string;
  streamUrl: string;
  zone: string;
}

export interface Detection {
  id: string;
  type: ViolationType;
  confidence: number;
  boundingBox: { x: number; y: number; width: number; height: number };
  timestamp: string;
}

export interface Alert {
  id: string;
  cameraId: string;
  cameraName: string;
  location: string;
  type: ViolationType;
  confidence: number;
  timestamp: string;
  status: AlertStatus;
  thumbnailUrl: string;
  videoClipUrl: string;
}

export interface Case {
  id: string;
  alertIds: string[];
  status: CaseStatus;
  assignedOfficer: string;
  createdAt: string;
  updatedAt: string;
  notes: string[];
  violationType: ViolationType;
  location: string;
}

export interface DashboardStats {
  totalViolationsToday: number;
  activeCameras: number;
  offlineCameras: number;
  openCases: number;
  violationChange: number;
}

// Mock Cameras
export const mockCameras: Camera[] = [
  { id: 'CAM-001', name: 'Main Entrance', location: 'Building A - Ground Floor', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam1', zone: 'Zone A' },
  { id: 'CAM-002', name: 'Cafeteria North', location: 'Building B - Level 1', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam2', zone: 'Zone B' },
  { id: 'CAM-003', name: 'Library Entrance', location: 'Building C - Ground Floor', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam3', zone: 'Zone C' },
  { id: 'CAM-004', name: 'Parking Lot A', location: 'Outdoor - East Side', status: 'warning', lastActive: '2024-01-15T10:25:00', streamUrl: '/streams/cam4', zone: 'Zone D' },
  { id: 'CAM-005', name: 'Student Center', location: 'Building D - Level 2', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam5', zone: 'Zone A' },
  { id: 'CAM-006', name: 'Sports Complex', location: 'Building E - Ground Floor', status: 'offline', lastActive: '2024-01-15T08:00:00', streamUrl: '/streams/cam6', zone: 'Zone E' },
  { id: 'CAM-007', name: 'Science Lab Wing', location: 'Building F - Level 3', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam7', zone: 'Zone F' },
  { id: 'CAM-008', name: 'Admin Building', location: 'Building G - Ground Floor', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam8', zone: 'Zone G' },
  { id: 'CAM-009', name: 'Dormitory Block A', location: 'Residence - East Wing', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam9', zone: 'Zone H' },
  { id: 'CAM-010', name: 'Cafeteria South', location: 'Building B - Level 1', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam10', zone: 'Zone B' },
  { id: 'CAM-011', name: 'Engineering Block', location: 'Building H - Level 2', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam11', zone: 'Zone I' },
  { id: 'CAM-012', name: 'Medical Center', location: 'Building I - Ground Floor', status: 'online', lastActive: '2024-01-15T10:30:00', streamUrl: '/streams/cam12', zone: 'Zone J' },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    cameraId: 'CAM-002',
    cameraName: 'Cafeteria North',
    location: 'Building B - Level 1',
    type: 'cigarette',
    confidence: 94.5,
    timestamp: '2024-01-15T10:28:00',
    status: 'new',
    thumbnailUrl: '/thumbnails/alt1.jpg',
    videoClipUrl: '/clips/alt1.mp4',
  },
  {
    id: 'ALT-002',
    cameraId: 'CAM-005',
    cameraName: 'Student Center',
    location: 'Building D - Level 2',
    type: 'vape',
    confidence: 87.2,
    timestamp: '2024-01-15T10:15:00',
    status: 'new',
    thumbnailUrl: '/thumbnails/alt2.jpg',
    videoClipUrl: '/clips/alt2.mp4',
  },
  {
    id: 'ALT-003',
    cameraId: 'CAM-010',
    cameraName: 'Cafeteria South',
    location: 'Building B - Level 1',
    type: 'cake',
    confidence: 91.8,
    timestamp: '2024-01-15T09:45:00',
    status: 'reviewed',
    thumbnailUrl: '/thumbnails/alt3.jpg',
    videoClipUrl: '/clips/alt3.mp4',
  },
  {
    id: 'ALT-004',
    cameraId: 'CAM-003',
    cameraName: 'Library Entrance',
    location: 'Building C - Ground Floor',
    type: 'csd',
    confidence: 96.1,
    timestamp: '2024-01-15T09:30:00',
    status: 'escalated',
    thumbnailUrl: '/thumbnails/alt4.jpg',
    videoClipUrl: '/clips/alt4.mp4',
  },
  {
    id: 'ALT-005',
    cameraId: 'CAM-001',
    cameraName: 'Main Entrance',
    location: 'Building A - Ground Floor',
    type: 'cigarette',
    confidence: 89.3,
    timestamp: '2024-01-15T09:00:00',
    status: 'dismissed',
    thumbnailUrl: '/thumbnails/alt5.jpg',
    videoClipUrl: '/clips/alt5.mp4',
  },
  {
    id: 'ALT-006',
    cameraId: 'CAM-009',
    cameraName: 'Dormitory Block A',
    location: 'Residence - East Wing',
    type: 'vape',
    confidence: 92.7,
    timestamp: '2024-01-15T08:45:00',
    status: 'new',
    thumbnailUrl: '/thumbnails/alt6.jpg',
    videoClipUrl: '/clips/alt6.mp4',
  },
];

// Mock Cases
export const mockCases: Case[] = [
  {
    id: 'CASE-001',
    alertIds: ['ALT-001', 'ALT-002'],
    status: 'open',
    assignedOfficer: 'James Rodriguez',
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-15T10:30:00',
    notes: ['Initial detection confirmed', 'Evidence collected'],
    violationType: 'cigarette',
    location: 'Building B',
  },
  {
    id: 'CASE-002',
    alertIds: ['ALT-004'],
    status: 'under_review',
    assignedOfficer: 'Maria Santos',
    createdAt: '2024-01-15T09:35:00',
    updatedAt: '2024-01-15T10:00:00',
    notes: ['Reviewing footage', 'Student identified'],
    violationType: 'csd',
    location: 'Building C',
  },
  {
    id: 'CASE-003',
    alertIds: ['ALT-005'],
    status: 'closed',
    assignedOfficer: 'James Rodriguez',
    createdAt: '2024-01-14T14:00:00',
    updatedAt: '2024-01-14T16:30:00',
    notes: ['False positive confirmed', 'Case closed'],
    violationType: 'cigarette',
    location: 'Building A',
  },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalViolationsToday: 24,
  activeCameras: 10,
  offlineCameras: 2,
  openCases: 5,
  violationChange: 12.5,
};

// Chart Data
export const violationsByTypeData = [
  { name: 'Cigarette', value: 45, color: 'hsl(var(--violation-cigarette))' },
  { name: 'Vape', value: 28, color: 'hsl(var(--violation-vape))' },
  { name: 'Cake', value: 15, color: 'hsl(var(--violation-cake))' },
  { name: 'CSD', value: 12, color: 'hsl(var(--violation-csd))' },
];

export const violationsByLocationData = [
  { location: 'Cafeteria', cigarette: 12, vape: 8, cake: 10, csd: 15 },
  { location: 'Library', cigarette: 5, vape: 3, cake: 2, csd: 8 },
  { location: 'Student Center', cigarette: 8, vape: 12, cake: 3, csd: 5 },
  { location: 'Dormitory', cigarette: 15, vape: 10, cake: 1, csd: 2 },
  { location: 'Sports', cigarette: 3, vape: 2, cake: 0, csd: 4 },
];

export const timeBasedTrendsData = [
  { time: '06:00', violations: 2 },
  { time: '08:00', violations: 8 },
  { time: '10:00', violations: 15 },
  { time: '12:00', violations: 22 },
  { time: '14:00', violations: 18 },
  { time: '16:00', violations: 25 },
  { time: '18:00', violations: 12 },
  { time: '20:00', violations: 8 },
  { time: '22:00', violations: 4 },
];

export const weeklyTrendsData = [
  { day: 'Mon', violations: 45 },
  { day: 'Tue', violations: 52 },
  { day: 'Wed', violations: 38 },
  { day: 'Thu', violations: 61 },
  { day: 'Fri', violations: 55 },
  { day: 'Sat', violations: 28 },
  { day: 'Sun', violations: 15 },
];

export const getViolationTypeLabel = (type: ViolationType): string => {
  const labels: Record<ViolationType, string> = {
    cigarette: 'Cigarette',
    vape: 'E-Cigarette/Vape',
    cake: 'Cake',
    csd: 'Carbonated Drink',
  };
  return labels[type];
};

export const getViolationTypeColor = (type: ViolationType): string => {
  const colors: Record<ViolationType, string> = {
    cigarette: 'violation-cigarette',
    vape: 'violation-vape',
    cake: 'violation-cake',
    csd: 'violation-csd',
  };
  return colors[type];
};
