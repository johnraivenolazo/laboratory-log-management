import { UserProfile, LabLog } from './types';

export const mockUsers: UserProfile[] = [
    {
        uid: 'prof-1',
        email: 'juan.delacruz@neu.edu.ph',
        displayName: 'Juan Dela Cruz',
        role: 'professor',
        photoURL: '',
        status: 'active',
    },
    {
        uid: 'prof-2',
        email: 'maria.santos@neu.edu.ph',
        displayName: 'Maria Santos',
        role: 'professor',
        photoURL: '',
        status: 'active',
    },
    {
        uid: 'prof-3',
        email: 'jose.reyes@neu.edu.ph',
        displayName: 'Jose Reyes',
        role: 'professor',
        photoURL: '',
        status: 'blocked',
    },
    {
        uid: 'admin-1',
        email: 'admin@neu.edu.ph',
        displayName: 'Admin Staff',
        role: 'admin',
        photoURL: '',
        status: 'active',
    },
];

export const mockLabs = [
    { id: 'lab-1', name: 'ComLab 1' },
    { id: 'lab-2', name: 'ComLab 2' },
    { id: 'lab-3', name: 'Multimedia Lab' },
    { id: 'lab-4', name: 'Network Lab' },
];

export const mockLogs: LabLog[] = [
    {
        id: 'log-1',
        professorId: 'prof-1',
        professorName: 'Juan Dela Cruz',
        roomNumber: 'ComLab 1',
        checkIn: new Date(new Date().setHours(8, 0, 0, 0)),
        checkOut: new Date(new Date().setHours(10, 0, 0, 0)),
        duration: 120,
    },
    {
        id: 'log-2',
        professorId: 'prof-2',
        professorName: 'Maria Santos',
        roomNumber: 'ComLab 2',
        checkIn: new Date(new Date().setHours(9, 30, 0, 0)),
        checkOut: new Date(new Date().setHours(11, 0, 0, 0)),
        duration: 90,
    },
    {
        id: 'log-3',
        professorId: 'prof-1',
        professorName: 'Juan Dela Cruz',
        roomNumber: 'Multimedia Lab',
        checkIn: new Date(new Date().setHours(13, 0, 0, 0)),
        // Currently active session (no check-out)
        checkOut: undefined,
        duration: undefined,
    },
    {
        id: 'log-4',
        professorId: 'prof-3',
        professorName: 'Jose Reyes',
        roomNumber: 'Network Lab',
        checkIn: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
        checkOut: new Date(new Date().setDate(new Date().getDate() - 1)),
        duration: 180,
    },
];
