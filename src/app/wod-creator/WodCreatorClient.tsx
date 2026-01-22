'use client'
import {Exercise, WorkoutExercises} from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';
import WodForm from '@/components/forms/WodForm';
import {useState} from "react";

const WodCreatorClient = ({ exercises }: { exercises: Exercise[] }) => {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutExercises[]>([]);

    const addExercise = (exercise: Exercise) => {
        setSelectedExercises([...selectedExercises, { workoutId : 1, exerciseId: exercise.id, weight: null, reps: null, createdAt: new Date()}]);
    }

    const removeSelectedExercise = (exercisePickedDate: Date) => {
        setSelectedExercises(selectedExercises.filter(selectedExercise => {
            const deletedExercise = exercisePickedDate.getTime() === selectedExercise.createdAt.getTime();
            return !deletedExercise;
        }));
    }

    const updateExercise = (exercisePickedDate: Date, field: string, value: number) => {
        const newSelectedExercises = selectedExercises.map(exercise => {
           if (exercisePickedDate.getTime() === exercise.createdAt.getTime()) {
               return {...exercise, [field]: value};
           }
           return exercise;
        });
        setSelectedExercises(newSelectedExercises);
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
                    updateExerciseData={updateExercise}
                    removeSelectedExercise={removeSelectedExercise}
                />
            </div>
        </div>
    )
}
export default WodCreatorClient
