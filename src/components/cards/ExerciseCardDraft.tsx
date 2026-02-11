import { Exercise, WorkoutExerciseDraft } from '@/db/schema';
import { Trash, Flame } from 'lucide-react';
import ExerciseCard from './ExerciseCard';

interface ExerciseCardDraftProps {
    exercise: Exercise;
    workoutDraft: WorkoutExerciseDraft;
    removeExercise: () => void;
    updateExerciseData: (createdAt: Date, field: string, value: number) => void;
}

const ExerciseCardDraft = ({ exercise, workoutDraft, removeExercise, updateExerciseData }: ExerciseCardDraftProps) => {
    const handleUpdate = (field: 'weight' | 'reps') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? 0 : Number(e.target.value);
        updateExerciseData(workoutDraft.createdAt, field, value);
    };

    return (
        <ExerciseCard exercise={exercise}>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                        <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
                        <input
                            type="number"
                            min={0}
                            placeholder="0"
                            value={workoutDraft.reps ?? ''}
                            onChange={handleUpdate('reps')}
                            className="w-14 bg-transparent border-none p-0 text-sm font-mono focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="font-mono text-sm font-bold text-foreground">reps</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                    <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={workoutDraft.weight ?? ''}
                        onChange={handleUpdate('weight')}
                        className="w-14 bg-transparent border-none p-0 text-sm font-mono focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="font-mono text-sm font-bold text-foreground">kg</span>
                </div>
                
                <button
                    type="button"
                    onClick={removeExercise}
                    className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-background text-muted-foreground cursor-pointer hover:text-destructive"
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </ExerciseCard>
    );
};

export default ExerciseCardDraft;
