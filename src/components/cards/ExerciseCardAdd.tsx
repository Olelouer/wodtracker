import { Exercise } from '@/db/schema';
import { Plus } from 'lucide-react';
import ExerciseCard from './ExerciseCard';

const ExerciseCardAdd = ({ exercise, addExercise }: { exercise: Exercise, addExercise: (exercise: Exercise) => void }) => {
    return (
        <ExerciseCard exercise={exercise}>
            <button
                type="button"
                aria-label={`Add ${exercise.name}`}
                onClick={() => addExercise(exercise)}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-border bg-background text-muted-foreground cursor-pointer"
            >
                <Plus className="w-4 h-4 text-brand" />
            </button>
        </ExerciseCard>
    )
};

export default ExerciseCardAdd