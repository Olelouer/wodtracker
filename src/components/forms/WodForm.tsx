import {X} from "lucide-react";
import {Exercise, WorkoutExercises} from '@/db/schema';

interface PickedWorkoutExercises {
    workoutExercises: WorkoutExercises[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
}
const WodForm = ({ workoutExercises, exercises, updateExerciseData, removeSelectedExercise }: PickedWorkoutExercises) => {
    return (
        <div>
            <h2 className="mt-10">Selected exercises</h2>
            <ul>
                {workoutExercises.map(selectedExercise => {
                    const selectedExerciseName = exercises.find(exercise => exercise.id === selectedExercise.exerciseId);
                    return (
                        <li key={`${selectedExercise.exerciseId}-${selectedExercise.createdAt.getTime()}` } draggable={true}>
                            <input
                                onChange={((e) => updateExerciseData(selectedExercise.createdAt, 'reps', Number(e.target.value)) )}
                                value={selectedExercise.reps ?? ""}
                                type="number"
                                name="reps"
                                placeholder="0"
                            />
                            <span>Reps</span>
                            <span>{selectedExerciseName?.name}</span>
                            <input
                                onChange={((e) => updateExerciseData(selectedExercise.createdAt, 'weight', Number(e.target.value)))}
                                value={selectedExercise.weight ?? ""}
                                type="number"
                                name="weight"
                                placeholder="0"
                            />
                            <span>Kg</span>
                            <button onClick={() => removeSelectedExercise(selectedExercise.createdAt) }>
                                <X name="removeExercise" color="black" size={20}/>
                            </button>
                        </li>
                    )})
                }
            </ul>
        </div>
    );
};

export default WodForm;