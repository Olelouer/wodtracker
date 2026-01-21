import {X} from "lucide-react";
import {Exercise, WorkoutExercises} from '@/db/schema';

const WodForm = ({ workoutExercises, exercises }: { workoutExercises: WorkoutExercises[], exercises: Exercise[]}) => {
    const removeSelectedExercise = (exercise: WorkoutExercises) => {
        /*setSelectedExercises(selectedExercises.filter(selectedExercise => {
            const deletedExercise = exercise.exerciseId === selectedExercise.exerciseId && exercise.createdAt.getTime() === selectedExercise.createdAt.getTime();
            return !deletedExercise;
        }));*/
    }

    const updateExercise = (workoutExercises: WorkoutExercises, field: string, value: string) => {

    }

    return (
        <div>
            <h2 className="mt-10">Selected exercises</h2>
            <ul>
                {workoutExercises.map(selectedExercise => {
                    const selectedExerciseName = exercises.find(exercise => exercise.id === selectedExercise.exerciseId);
                    return (
                        <li key={`${selectedExercise.exerciseId}-${crypto.randomUUID()}` } draggable={true}>
                            <input onChange={((e) => selectedExercise.reps = Number(e.target.value) )} type="number" name="reps" placeholder="0"/>
                            <span>Reps</span>
                            <span>{selectedExerciseName?.name}</span>
                            <input onChange={((e) => updateExercise(selectedExercise, '', e.target.value))} type="number" name="weight" placeholder="0"/>
                            <span>Kg</span>
                            <button onClick={() => removeSelectedExercise(selectedExercise) }>
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