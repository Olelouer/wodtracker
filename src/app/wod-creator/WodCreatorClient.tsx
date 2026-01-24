'use client'
import {Exercise, WorkoutExercisesDraft} from '@/db/schema';
import ExercisesPicker from '@/components/list/ExercisesPicker';
import WodForm from '@/components/forms/WodForm';
import {useState} from "react";
import { saveWodAction } from '@/app/wod-creator/actions';

const WodCreatorClient = ({ exercises }: { exercises: Exercise[] }) => {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutExercisesDraft[]>([]);

    const addExercise = (exercise: Exercise) => {
        setSelectedExercises([...selectedExercises, { exerciseId: exercise.id, weight: null, reps: null, createdAt: new Date()}]);
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
        if(result) console.log(result);
    }

    return (
        <div>
            <div>
                <ExercisesPicker
                    exercises={exercises}
                    addExercise={addExercise}
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
