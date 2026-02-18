import {Exercise, WorkoutExerciseDraft} from '@/db/schema';
import ExerciseCardDraft from '../cards/exercise-cards/ExerciseCardDraft';
import { CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import WodCardLayout from '../cards/wod-cards/WodCardLayout';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState, useRef } from 'react';

interface PickedWorkoutExercises {
    workoutExercisesDraft: WorkoutExerciseDraft[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
    reorderExercises: (fromIndex: number, toIndex: number) => void;
    saveWorkout: (formData: FormData) => void;
}
const WodForm = ({ workoutExercisesDraft, exercises, updateExerciseData, removeSelectedExercise, reorderExercises, saveWorkout }: PickedWorkoutExercises) => {
    /** Index où la ligne d’insertion est affichée (0 = au-dessus du premier, N = en dessous du dernier). */
    const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
    const dragFromIndexRef = useRef<number | null>(null);

    return (
        <div>
            <h2 className="mt-10 font-bold  tracking-tight uppercase mb-4">Selected exercises</h2>
            {workoutExercisesDraft && workoutExercisesDraft.length > 0 && (
                <form action={saveWorkout}>
                    <WodCardLayout
                        header={
                            <>
                                <CardTitle className="text-2xl font-black uppercase tracking-tight text-foreground">
                                    <Input type="text" placeholder="Workout title" />
                                </CardTitle>
                            </>
                        }
                        content={
                            <ul
                                className="space-y-2 relative"
                                onDragLeave={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropIndicatorIndex(null);
                                }}
                                onDragEnd={() => {
                                    setDropIndicatorIndex(null);
                                    dragFromIndexRef.current = null;
                                }}
                            >
                                {workoutExercisesDraft.map((workoutDraft, index) => {
                                    const exercise = exercises.find(ex => ex.id === workoutDraft.exerciseId);
                                    if (!exercise) return null;
                                    const showLineAbove = dropIndicatorIndex === index;
                                    const showLineBelow = dropIndicatorIndex === index + 1;
                                    return (
                                        <li
                                            className="animate-in zoom-in-95 fade-in duration-200 cursor-grab active:cursor-grabbing list-none relative"
                                            key={`${workoutDraft.exerciseId}-${workoutDraft.createdAt.getTime()}`}
                                            draggable
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData('text/plain', index.toString());
                                                e.dataTransfer.effectAllowed = 'move';
                                                dragFromIndexRef.current = index;
                                            }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                e.dataTransfer.dropEffect = 'move';
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const mid = rect.top + rect.height / 2;
                                                const insertIndex = e.clientY < mid ? index : index + 1;
                                                setDropIndicatorIndex(insertIndex);
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const fromIndex = Number(e.dataTransfer.getData('text/plain'));
                                                const toIndex = dropIndicatorIndex !== null
                                                    ? (dropIndicatorIndex > fromIndex ? dropIndicatorIndex - 1 : dropIndicatorIndex)
                                                    : index;
                                                setDropIndicatorIndex(null);
                                                dragFromIndexRef.current = null;
                                                if (fromIndex !== toIndex) reorderExercises(fromIndex, toIndex);
                                            }}
                                        >
                                            {showLineAbove && (
                                                <div
                                                    className="absolute left-0 right-0 -top-1 h-0.5 bg-brand rounded-full z-10 pointer-events-none"
                                                    aria-hidden
                                                />
                                            )}
                                            <ExerciseCardDraft
                                                exercise={exercise}
                                                workoutDraft={workoutDraft}
                                                removeExercise={() => removeSelectedExercise(workoutDraft.createdAt)}
                                                updateExerciseData={updateExerciseData}
                                            />
                                            {showLineBelow && (
                                                <div
                                                    className="absolute left-0 right-0 -bottom-1 h-px bg-brand rounded-full z-10 pointer-events-none"
                                                    aria-hidden
                                                />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        }
                        footer={
                            <></>
                        }
                    >
                    </WodCardLayout>
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