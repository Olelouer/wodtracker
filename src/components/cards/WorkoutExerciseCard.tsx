import { ExerciseWithDetails } from "@/db/schema";
import { Flame } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

const WorkoutExerciseCard = ({ exerciseWithDetails }: { exerciseWithDetails: ExerciseWithDetails }) => {
    const exercise = exerciseWithDetails.exercise;
    return (
        <ExerciseCard exercise={exercise}>
            {exerciseWithDetails.reps && (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-borde font-mono text-xs font-semibold">
                        {exerciseWithDetails.reps}
                        <span className="font-mono font-semibold tracking-wide text-foreground">reps</span>
                    </div>
                </div>
            )}
            {exerciseWithDetails.weight && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                    <span className="font-mono text-xs font-semibold text-foreground">
                        {`${exerciseWithDetails.weight}kg`}
                    </span>
                </div>
            )}
            {exerciseWithDetails.sets && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border text-xs">
                    <span className="font-mono font-semibold text-foreground">
                        {`${exerciseWithDetails.sets} sets`}
                    </span>
                </div>
            )}
        </ExerciseCard>
    )
}
export default WorkoutExerciseCard