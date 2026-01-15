import { Wod } from '@/types/wod';

export const getWods = async (): Promise<Wod[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return [
        { id: 1, title: 'Fran', exercises: [{ id: 1, name: 'Thrusters' }, { id: 2, name: 'Pull-ups' }], date: '2025-01-12', type: 'FOR TIME'},
        { id: 2, title: 'Diane', exercises: [{ id: 3, name: 'Deadlift' }, { id: 4, name: 'Handstand Push-ups' }], date: '2025-01-11', type: 'FOR TIME'}
    ]
}