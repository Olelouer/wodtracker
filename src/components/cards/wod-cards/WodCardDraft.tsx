import WodCardLayout from '@/components/cards/wod-cards/WodCardLayout';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Timer, Zap } from 'lucide-react';
import ExerciseCardDraft from '../exercise-cards/ExerciseCardDraft';
import { useRef, useState } from 'react';
import { Exercise, WorkoutExerciseDraft } from '@/db/schema';
import { cn } from '@/lib/utils';

const WORKOUT_TYPES = [
    'AMRAP',
    'EMOM',
    'FOR_TIME',
    'TABATA',
    'STRENGTH',
    'HERO',
    'BENCHMARK',
    'SKILL',
    'ACCESSORY',
] as const;

interface WodCardDraftProps {
    workoutExercisesDraft: WorkoutExerciseDraft[];
    exercises: Exercise[];
    updateExerciseData: (exercisePickedDate: Date, field: string, value: number) => void;
    removeSelectedExercise: (exercisePickedDate: Date) => void;
    reorderExercises: (fromIndex: number, toIndex: number) => void;
    initialTitle?: string;
    initialType?: string;
    initialDuration?: number | null;
    initialIsRx?: boolean;
    initialDate?: string;
}

const WodCardDraft = ({
    workoutExercisesDraft,
    exercises,
    updateExerciseData,
    removeSelectedExercise,
    reorderExercises,
    initialTitle,
    initialType,
    initialDuration,
    initialIsRx = true,
    initialDate,
}: WodCardDraftProps) => {
    const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
    const dragFromIndexRef = useRef<number | null>(null);

    const today = new Date().toISOString().slice(0, 10);
    const dateValue = initialDate ?? today;

    return (
        <WodCardLayout
            header={
                <>
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <Badge
                                variant="outline"
                                className="border-brand/30 bg-brand/10 text-brand font-bold text-[10px] tracking-wider w-fit"
                                asChild
                            >
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <Zap className="w-8 h-8" />
                                    <Select
                                        name="type"
                                        required
                                        defaultValue={initialType ?? 'AMRAP'}
                                    >
                                        <SelectTrigger
                                            name="type"
                                            className="text-brand font-bold text-sm tracking-wider outline-none cursor-pointer focus:ring-0 h-auto"
                                        >
                                            <SelectValue placeholder="Select workout type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {WORKOUT_TYPES.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </label>
                            </Badge>
                            <CardTitle className="text-2xl text-foreground">
                                <Input
                                    name="title"
                                    type="text"
                                    placeholder="Workout title"
                                    defaultValue={initialTitle}
                                    className="text-2xl font-black tracking-tight focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
                                />
                            </CardTitle>
                        </div>
                        <label
                            className={cn(
                                'cursor-pointer select-none font-black text-sm px-3 py-1 rounded-lg shadow-md transition-colors',
                                'has-checked:bg-foreground has-checked:text-background',
                                'has-[:not(:checked)]:bg-muted has-[:not(:checked)]:text-muted-foreground border border-border'
                            )}
                        >
                            <input
                                type="checkbox"
                                name="isRx"
                                value="on"
                                defaultChecked={initialIsRx}
                                className="sr-only"
                            />
                            RX
                        </label>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
                        <Timer className="w-4 h-4 shrink-0" />
                        <Input
                            name="duration"
                            type="number"
                            placeholder="Duration"
                            min={0}
                            defaultValue={initialDuration ?? ''}
                            className="w-20 h-8"
                        />
                        <span className="text-sm font-medium"> min</span>
                    </div>
                </>
            }
            content={
                <ul
                    className="space-y-2 relative"
                    onDragLeave={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node))
                            setDropIndicatorIndex(null);
                    }}
                    onDragEnd={() => {
                        setDropIndicatorIndex(null);
                        dragFromIndexRef.current = null;
                    }}
                >
                    {workoutExercisesDraft.map((workoutDraft, index) => {
                        const exercise = exercises.find((ex) => ex.id === workoutDraft.exerciseId);
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
                                    const toIndex =
                                        dropIndicatorIndex !== null
                                            ? dropIndicatorIndex > fromIndex
                                                ? dropIndicatorIndex - 1
                                                : dropIndicatorIndex
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
                                    removeExercise={() =>
                                        removeSelectedExercise(workoutDraft.createdAt)
                                    }
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
                <div className="flex items-center justify-between pt-4 w-full border-t border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Input
                            name="date"
                            type="date"
                            defaultValue={dateValue}
                            className="font-semibold tracking-wide"
                        />
                    </div>
                    {workoutExercisesDraft.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="font-medium">{workoutExercisesDraft.length}</span>
                            <span className="font-semibold uppercase tracking-wide">
                                exercises
                            </span>
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default WodCardDraft;
