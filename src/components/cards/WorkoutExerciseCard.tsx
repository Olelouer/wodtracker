import { ExerciseWithDetails } from "@/db/schema";
import { Flame } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

const WorkoutExerciseCard = ({ exerciseWithDetails }: { exerciseWithDetails: ExerciseWithDetails }) => {
    const exercise = exerciseWithDetails.exercise;
    return (
        <ExerciseCard exercise={exercise}>
            {exerciseWithDetails.reps && (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-borde font-mono text-sm font-semibold">
                        <Flame className="w-3.5 h-3.5 text-brand shrink-0" />
                        {exerciseWithDetails.reps}
                        <span className="text-xs font-semibold uppercase tracking-wide">reps</span>
                    </div>
                </div>
            )}
            {exerciseWithDetails.weight && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                    <span className="font-mono text-sm font-semibold text-foreground">
                        {`${exerciseWithDetails.weight}kg`}
                    </span>
                </div>
            )}
        </ExerciseCard>
    )
}
export default WorkoutExerciseCard