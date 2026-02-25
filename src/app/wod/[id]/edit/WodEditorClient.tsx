'use client';

import { Exercise, WorkoutExerciseDraft, WorkoutWithExercises } from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';
import WodForm from '@/components/forms/WodForm';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { updateWodAction } from '@/app/wod-creator/actions';

export default function WodEditorClient({
    workout,
    exercises,
    exercisesTypes,
}: {
    workout: WorkoutWithExercises;
    exercises: Exercise[];
    exercisesTypes: { type: string }[];
}) {
    const router = useRouter();

    const initialDrafts = useMemo<WorkoutExerciseDraft[]>(
        () =>
            workout.workoutExercises.map((we) => ({
                exerciseId: we.exerciseId,
                sets: we.sets,
                reps: we.reps,
                weight: we.weight,
                comment: we.comment,
                createdAt: we.createdAt instanceof Date ? we.createdAt : new Date(we.createdAt),
            })),
        [workout.workoutExercises]
    );

    const [selectedExercises, setSelectedExercises] = useState<WorkoutExerciseDraft[]>(initialDrafts);

    const addExercise = (exercise: Exercise) => {
        setSelectedExercises((prev) => [
            ...prev,
            {
                exerciseId: exercise.id,
                sets: null,
                reps: null,
                weight: null,
                comment: null,
                createdAt: new Date(),
            },
        ]);
    };

    const removeSelectedExercise = (exercisePickedDate: Date) => {
        setSelectedExercises((prev) =>
            prev.filter((ex) => ex.createdAt.getTime() !== exercisePickedDate.getTime())
        );
    };

    const updateExercise = (exercisePickedDate: Date, field: string, value: number) => {
        setSelectedExercises((prev) =>
            prev.map((ex) =>
                ex.createdAt.getTime() === exercisePickedDate.getTime()
                    ? { ...ex, [field]: value }
                    : ex
            )
        );
    };

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
        const result = await updateWodAction(workout.id, formData, selectedExercises);
        if (result.success) {
            router.push('/dashboard');
        }
        return result;
    };

    const initialWorkout = useMemo(
        () => ({
            title: workout.title,
            type: workout.type,
            duration: workout.duration,
            isRx: workout.isRx,
            date: workout.date,
        }),
        [workout]
    );

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
                    initialWorkout={initialWorkout}
                />
            </div>
        </div>
    );
}
