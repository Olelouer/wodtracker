import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Timer, Zap } from 'lucide-react';
import {WorkoutWithExercises} from "@/db/schema";
import { getExerciseIcon } from '../ui/exercise-icon';
import WorkoutExerciseCard from './WorkoutExerciseCard';

const WodCard = ({ wod }: { wod: WorkoutWithExercises }) => {
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
                        <WorkoutExerciseCard key={ex.id} exerciseWithDetails={ex} />
                    ))}
                </div>
            </CardContent>
            {/* Footer */}
            <CardFooter className="mt-auto space-y-4 w-full px-4">
                <div className="flex items-center justify-between pt-4 w-full border-t border-border">
                    <div className="flex items-center gap--2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs ml-2 font-semibold uppercase tracking-wide">
                            {wod.date?.toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="font-medium">{wod.workoutExercises.length}</span>
                        <span className="text-xs font-semibold uppercase tracking-wide">exercises</span>
                    </div>
                </div>
            </CardFooter>
            
        </Card>
    )
}
export default WodCard
