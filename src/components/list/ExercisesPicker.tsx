"use client"
import {Exercise} from "@/db/schema";
import ExerciseCardAdd from "../cards/ExerciseCardAdd";

const ExercisesPicker = ({ exercises, addExercise }: { exercises: Exercise[], addExercise: (exercise: Exercise) => void;}) => {
    return (
        <div>
            <h2 className="mt-10">Exercises picker</h2>
            <ul className="list-none">
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