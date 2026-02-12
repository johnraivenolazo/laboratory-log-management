import { UserProfile, LabLog, Room } from './types';
import { subHours, subDays, startOfToday } from 'date-fns';

export const MOCK_USERS: UserProfile[] = [
  {
    uid: 'prof-1',
    email: 'j.delacruz@neu.edu.ph',
    displayName: 'Juan Dela Cruz',
    role: 'professor',
    status: 'active',
    employeeId: 'EMP-001',
    photoURL: 'https://picsum.photos/seed/1/100/100'
  },
  {
    uid: 'prof-2',
    email: 'm.santos@neu.edu.ph',
    displayName: 'Maria Santos',
    role: 'professor',
    status: 'active',
    employeeId: 'EMP-002',
    photoURL: 'https://picsum.photos/seed/2/100/100'
  },
  {
    uid: 'prof-3',
    email: 'r.reyes@neu.edu.ph',
    displayName: 'Ricardo Reyes',
    role: 'professor',
    status: 'blocked',
    employeeId: 'EMP-003',
    photoURL: 'https://picsum.photos/seed/3/100/100'
  },
  {
    uid: 'admin-1',
    email: 'admin@neu.edu.ph',
    displayName: 'System Administrator',
    role: 'admin',
    status: 'active',
    photoURL: 'https://picsum.photos/seed/admin/100/100'
  }
];

export const MOCK_ROOMS: Room[] = [
  { id: 'room-101', name: 'CS Lab 1', building: 'Tech Building', activeSessions: 1 },
  { id: 'room-102', name: 'Bio Lab 2', building: 'Science Building', activeSessions: 0 },
  { id: 'room-201', name: 'Chem Lab 1', building: 'Science Building', activeSessions: 2 },
  { id: 'room-202', name: 'Physics Lab', building: 'Tech Building', activeSessions: 0 },
];

export const MOCK_LOGS: LabLog[] = [
  {
    id: 'log-1',
    professorId: 'prof-1',
    professorName: 'Juan Dela Cruz',
    roomNumber: '101',
    checkIn: subHours(new Date(), 2),
    checkOut: subHours(new Date(), 1),
    duration: 60
  },
  {
    id: 'log-2',
    professorId: 'prof-2',
    professorName: 'Maria Santos',
    roomNumber: '201',
    checkIn: subHours(new Date(), 3),
    checkOut: subHours(new Date(), 2),
    duration: 60
  },
  {
    id: 'log-3',
    professorId: 'prof-1',
    professorName: 'Juan Dela Cruz',
    roomNumber: '101',
    checkIn: subDays(new Date(), 1),
    checkOut: subHours(subDays(new Date(), 1), -2),
    duration: 120
  }
];
