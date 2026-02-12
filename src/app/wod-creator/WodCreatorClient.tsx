'use client'

import { Exercise, WorkoutExerciseDraft } from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';
import WodForm from '@/components/forms/WodForm';
import {useState} from "react";
import { saveWodAction } from '@/app/wod-creator/actions';

const WodCreatorClient = ({ exercises, exercisesTypes }: { exercises: Exercise[], exercisesTypes: { type: string }[] }) => {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutExerciseDraft[]>([]);

    const addExercise = (exercise: Exercise) => {
        setSelectedExercises([
            ...selectedExercises,
            {
                exerciseId: exercise.id,
                sets: null,
                reps: null,
                weight: null,
                comment: null,
                createdAt: new Date(),
            },
        ]);
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

    const saveWorkout = async() => {
        const result = await saveWodAction(selectedExercises);
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ExercisesPicker
                    exercises={exercises}
                    addExercise={addExercise}
                    exercisesTypes={exercisesTypes}
                />
                <WodForm
                    workoutExercisesDraft={selectedExercises}
                    exercises={exercises}
                    updateExerciseData={updateExercise}
                    removeSelectedExercise={removeSelectedExercise}
                    saveWorkout={saveWorkout}
                />
            </div>
        </div>
    )
}
export default WodCreatorClient
