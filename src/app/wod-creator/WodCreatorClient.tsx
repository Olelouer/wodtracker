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
        setSelectedExercises((prev) => 
            prev.filter((ex) => ex.createdAt.getTime() != exercisePickedDate.getTime())
        )
    }

    const updateExercise = (exercisePickedDate: Date, field: string, value: number) => {
        setSelectedExercises((prev) => 
            prev.map((ex) => {
                if(ex.createdAt.getTime() === exercisePickedDate.getTime()) {
                    return {...ex, [field]: value}
                }
                return ex;
            })
        );
    }

    const reorderExercises = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;
        setSelectedExercises((prev) => {
            const next = [...prev];
            const [item] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, item);
            return next;
        });
    };

    const saveWorkout = async (formData: FormData) => {
        await saveWodAction(formData, selectedExercises);
    };

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
                    reorderExercises={reorderExercises}
                    saveWorkout={saveWorkout}
                />
            </div>
        </div>
    )
}
export default WodCreatorClient
