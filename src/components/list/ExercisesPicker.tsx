"use client"
import { useState } from 'react';
import {Exercise, WorkoutExercises} from "@/db/schema";

const ExercisesPicker = ({exercises}: { exercises: Exercise[]}) => {
    const [selectedExerciseId, setSelectedExerciseId] = useState<WorkoutExercises[]>([]);
    return (
        <div>
            <h2>Exercises picker</h2>
            <ul className="list-none">
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        <button
                            onClick={() => setSelectedExerciseId([...selectedExerciseId, { workoutId : 1, exerciseId: exercise.id, weight: null, reps: null, createdAt: new Date()}])}
                            style={{ backgroundColor: selectedExerciseId.find(exercisesSelection => exercisesSelection.exerciseId === exercise.id) ? "red" : "green"}}
                        >
                            {exercise.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ExercisesPicker;