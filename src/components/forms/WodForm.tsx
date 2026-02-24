import {Exercise, WorkoutExerciseDraft} from '@/db/schema';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import WodCardDraft from '../cards/wod-cards/WodCardDraft';

interface PickedWorkoutExercises {
    workoutExercisesDraft: WorkoutExerciseDraft[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
    reorderExercises: (fromIndex: number, toIndex: number) => void;
    saveWorkout: (formData: FormData) => void;
}
const WodForm = ({ workoutExercisesDraft, exercises, updateExerciseData, removeSelectedExercise, reorderExercises, saveWorkout }: PickedWorkoutExercises) => {
    

    return (
        <div>
            <h2 className="mt-10 font-bold  tracking-tight uppercase mb-4">Selected exercises</h2>
            {workoutExercisesDraft && workoutExercisesDraft.length > 0 && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveWorkout(new FormData(e.currentTarget));
                    }}
                >
                    <WodCardDraft 
                        workoutExercisesDraft={workoutExercisesDraft} 
                        exercises={exercises} 
                        updateExerciseData={updateExerciseData} 
                        removeSelectedExercise={removeSelectedExercise} 
                        reorderExercises={reorderExercises} 
                    />
                    <Button type="submit" className="cursor-pointer text-lg font-semibold mx-4 mt-4">Save Wod</Button>
                </form>
            )}
            {workoutExercisesDraft && workoutExercisesDraft.length <= 0 && (
                <div className="flex justify-center">
                    <p className="mt-10 font-semibold text-muted-foreground mb-4 flex items-center gap-2">Click on 
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background text-muted-foreground">
                            <Plus className="w-3 h-3 text-brand" />
                        </span>
                        to add an exercise
                    </p>
                </div>
            )}
        </div>
    );
};

export default WodForm;