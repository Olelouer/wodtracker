"use client"
import { useState } from 'react';
import {Exercise, WorkoutExercises} from "@/db/schema";

const ExercisesPicker = ({exercises}: { exercises: Exercise[]}) => {
    const [selectedExercisesId, setSelectedExercisesId] = useState<WorkoutExercises[]>([]);
    const removeSelectedExercise = (exercise: WorkoutExercises) => {
        setSelectedExercisesId(selectedExercisesId.filter(selectedExercise => {
            const deletedExercise = exercise.exerciseId === selectedExercise.exerciseId && exercise.createdAt.getTime() === selectedExercise.createdAt.getTime();
            return !deletedExercise;
        }));
    }

    return (
        <div>
            <h2>Exercises picker</h2>
            <ul className="list-none">
                {exercises.map(exercise => (
                    <li key={exercise.id} draggable={true}>
                        <button
                            onClick={() => setSelectedExercisesId([...selectedExercisesId, { workoutId : 1, exerciseId: exercise.id, weight: null, reps: null, createdAt: new Date()}])}
                            style={{ backgroundColor: selectedExercisesId.find(exercisesSelection => exercisesSelection.exerciseId === exercise.id) ? "red" : "green"}}
                        >
                            {exercise.name}
                        </button>
                    </li>
                ))}
            </ul>
            <h2>Selected exercises</h2>
            <ul>
                {selectedExercisesId.map(selectedExercise => {
                    const selectedExerciseName = exercises.find(exercise => exercise.id === selectedExercise.exerciseId);
                    return (
                        <li key={`${selectedExercise.exerciseId}-${crypto.randomUUID()}` } draggable={true}>
                            <button onClick={() => removeSelectedExercise(selectedExercise) }>
                                {selectedExerciseName?.name}
                            </button>
                        </li>
                    )})
                }
            </ul>
        </div>
    )
};

export default ExercisesPicker;