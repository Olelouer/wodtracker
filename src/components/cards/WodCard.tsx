import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Flame, Calendar, Timer, Zap, Activity, Orbit } from 'lucide-react';
import {Exercise, WorkoutWithExercises} from "@/db/schema";

const WodCard = ({ wod }: { wod: WorkoutWithExercises }) => {

    const getExerciseIcon = (exercise: Exercise) => {
        switch(exercise.type) {
            case 'gymnastic': return <Orbit className="w-4 h-4"/>
            case 'cardio': return <Activity className="w-4 h-4"/>
            default: return <Dumbbell className="w-4 h-4"/>
        }
    }
    return (
        <Card className="group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition duration-300">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-brand-500 via-brand-accent-500 to-brand-600"/>

            <CardHeader className="pb-4 pl-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        {wod.type && (
                            <Badge variant="outline"
                                   className="border-brand-500/30 bg-brand-500/10 text-brand-600 font-bold text-[10px] tracking-wider"
                            >
                                <Zap className="w-3 h-3"/>
                                {wod.type}
                            </Badge>
                        )}
                        <CardTitle className="text-2xl font-black uppercase tracking-tight text-foreground">
                            {wod.title || "WOD"}
                        </CardTitle>
                    </div>
                    {wod.isRx && (
                        <Badge className="bg-foreground text-background font-black text-sm px-3 py-1 rounded-lg shadow.md">
                            RX
                        </Badge>
                    )}
                </div>

                {wod.duration && (
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">{wod.duration} min</span>
                    </div>
                )}
            </CardHeader>

            <CardContent className="space-y-4 pl-6">
                <div className="space-y-2">
                    {wod.workoutExercises.map((ex) => (
                        <div
                            key={ex.id}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-muted"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-between w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-accent-500 text-brand-foreground shadow-sm">
                                    {getExerciseIcon(ex.exercise)}
                                </div>
                                <span className="font-semibold text-sm text-foreground">
                                    {ex.exercise.name}
                                </span>
                            </div>
                            { (ex.reps || ex.weight) && (
                                <div className="flex items-center gap-1">
                                    {ex.reps && (
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                                            <Flame className="w-3.5 h-3.5 text-brand-500"/>
                                            {ex.reps}
                                        </div>
                                    )}
                                    { ex.weight && (
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border">
                                            <span className="font-mono text-sm font-bold text-foreground">
                                                {`${ex.weight}kg`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap--2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">
                            {wod.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="font-medium">{wod.workoutExercises.length}</span>
                        <span className="text-xs font-semibold uppercase tracking-wide">exercises</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default WodCard
