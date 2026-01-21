'use client'
import {Exercise, WorkoutExercises} from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';
import WodForm from '@/components/forms/WodForm';
import {useState} from "react";

const WodCreatorClient = ({ exercises }: { exercises: Exercise[] }) => {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutExercises[]>([]);

    const addExercise = (exercise: Exercise) => {
        console.log(selectedExercises)
        setSelectedExercises([...selectedExercises, { workoutId : 1, exerciseId: exercise.id, weight: null, reps: null, createdAt: new Date()}]);
    }

    return (
        <div>
            <div>
                <ExercisesPicker
                    exercises={exercises}
                    addExercise={addExercise}
                />
                <WodForm
                    workoutExercises={selectedExercises}
                    exercises={exercises}
                />
            </div>
        </div>
    )
}
export default WodCreatorClient
