export type Wodtype = 'AMRAP' | 'EMOM' | 'FOR TIME';

export interface Wod {
    id: number;
    title: string;
    exercises: Exercise[];
    type: Wodtype;
    date: string;
}

export interface Exercise {
    id: number;
    name: string;
    reps?: number;
    weight?: number;
}

export interface WodList {
    wods: Wod[]
}

