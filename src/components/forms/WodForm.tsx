import {Exercise, WorkoutExerciseDraft} from '@/db/schema';
import ExerciseCard from "../cards/ExerciseCard";
import ExerciseCardDraft from '../cards/ExerciseCardDraft';

interface PickedWorkoutExercises {
    workoutExercisesDraft: WorkoutExerciseDraft[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
    saveWorkout: (formData: FormData) => void;
}
const WodForm = ({ workoutExercisesDraft, exercises, updateExerciseData, removeSelectedExercise, saveWorkout }: PickedWorkoutExercises) => {
    return (
        <div>
            <h2 className="mt-10">Selected exercises</h2>
            <form action={saveWorkout}>
                <ul>
                    {workoutExercisesDraft.map(workoutDraft => {
                        const exercise = exercises.find(ex => ex.id === workoutDraft.exerciseId);
                        if (!exercise) return null;
                        return (
                            <ExerciseCardDraft
                                key={`${workoutDraft.exerciseId}-${workoutDraft.createdAt.getTime()}`}
                                exercise={exercise}
                                workoutDraft={workoutDraft}
                                removeExercise={() => removeSelectedExercise(workoutDraft.createdAt)}
                                updateExerciseData={updateExerciseData}
                            />
                        );
                    })}
                </ul>
                <button type="submit">Save Wod</button>
            </form>
        </div>
    );
};

export default WodForm;