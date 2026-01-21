"use client"
import {Exercise} from "@/db/schema";

const ExercisesPicker = ({ exercises, addExercise }: { exercises: Exercise[], addExercise: (exercise: Exercise) => void;}) => {
    return (
        <div>
            <h2 className="mt-10">Exercises picker</h2>
            <ul className="list-none">
                {exercises.map(exercise => (
                    <li key={exercise.id} className="mt-1">
                        <button
                            onClick={() => addExercise(exercise)}
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