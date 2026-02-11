"use client"
import {Exercise} from "@/db/schema";
import ExerciseCardAdd from "../cards/ExerciseCardAdd";

const ExercisesPicker = ({ exercises, addExercise }: { exercises: Exercise[], addExercise: (exercise: Exercise) => void;}) => {
    return (
        <div>
            <h2 className="mt-10 text-lgl font-bold mb-4 uppercase tracking-tight">Add exercises</h2>
            <ul className="list-none flex flex-col gap-2">
                {exercises.map(exercise => (
                    <ExerciseCardAdd 
                        key={exercise.id} 
                        exercise={exercise} 
                        addExercise={addExercise}
                    />
                ))}
            </ul>
        </div>
    )
};

export default ExercisesPicker;