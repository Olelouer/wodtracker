import {Exercise, WorkoutExerciseDraft} from '@/db/schema';
import ExerciseCardDraft from '../cards/ExerciseCardDraft';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { text } from 'stream/consumers';

interface PickedWorkoutExercises {
    workoutExercisesDraft: WorkoutExerciseDraft[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
    reorderExercises: (fromIndex: number, toIndex: number) => void;
    saveWorkout: (formData: FormData) => void;
}
const WodForm = ({ workoutExercisesDraft, exercises, updateExerciseData, removeSelectedExercise, reorderExercises, saveWorkout }: PickedWorkoutExercises) => {
    const [dragOver, setDragOver] = useState<number | null>();
    
    return (
        <div>
            <h2 className="mt-10 font-bold  tracking-tight uppercase mb-4">Selected exercises</h2>
            {workoutExercisesDraft && workoutExercisesDraft.length > 0 && (
                <form action={saveWorkout}>
                    <ul className="space-y-2">
                        {workoutExercisesDraft.map((workoutDraft, index) => {
                            const exercise = exercises.find(ex => ex.id === workoutDraft.exerciseId);
                            if (!exercise) return null;
                            return (
                                <li
                                    className={`animate-in zoom-in-95 fade-in duration-200 cursor-grab active:cursor-grabbing list-none ${ dragOver === index ? 'border rounded-lg border-brand' : ''}`}
                                    key={`${workoutDraft.exerciseId}-${workoutDraft.createdAt.getTime()}`}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('text/plain', index.toString());
                                        e.dataTransfer.effectAllowed = 'move';
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        if(dragOver !== index && index !== Number(e.dataTransfer.getData('text/plain'))) {
                                            setDragOver(index);
                                        }
                                        e.dataTransfer.dropEffect = 'move';
                                    }}
                                    onDragLeave={() => setDragOver(null)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const fromIndex = Number(e.dataTransfer.getData('text/plain'));
                                        if (fromIndex !== index) reorderExercises(fromIndex, index);
                                    }}
                                >
                                    <ExerciseCardDraft
                                        exercise={exercise}
                                        workoutDraft={workoutDraft}
                                        removeExercise={() => removeSelectedExercise(workoutDraft.createdAt)}
                                        updateExerciseData={updateExerciseData}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <Button type="submit" className="cursor-pointer text-lg font-semibold mx-4 mt-4">Save Wod</Button>
                </form>
            )}
            {workoutExercisesDraft && workoutExercisesDraft.length <= 0 && (
                <div className="flex justify-center">
                    <p className="mt-10 font-semibold text-muted-foreground mb-4 flex items-center gap-2">Click on 
                        <span className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background text-muted-foreground">
                            <Plus className="w-3 h-3 text-brand" />
                        </span>
                        to add an exercise
                    </p>
                </div>
            )}
        </div>
    );
};

export default WodForm;