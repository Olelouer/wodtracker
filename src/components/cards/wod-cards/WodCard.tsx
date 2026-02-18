import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Timer, Zap } from 'lucide-react';
import {WorkoutWithExercises} from "@/db/schema";
import WorkoutExerciseCard from '../exercise-cards/WorkoutExerciseCard';
import WodCardLayout from './WodCardLayout';

const WodCard = ({ wod }: { wod: WorkoutWithExercises }) => {
    return (
        <WodCardLayout
            header={
                <>
                    { (wod.type || wod.title || wod.isRx) && 
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                {wod.type && (
                                    <Badge variant="outline"
                                        className="border-brand/30 bg-brand/10 text-brand font-bold text-[10px] tracking-wider"
                                    >
                                        <Zap className="w-3 h-3"/>
                                        {wod.type}
                                    </Badge>
                                )}
                                <CardTitle className="text-2xl font-black uppercase tracking-tight text-foreground">
                                    {wod.title || "Workout"}
                                </CardTitle>
                            </div>
                            {wod.isRx && (
                                <Badge className="bg-foreground text-background font-black text-sm px-3 py-1 rounded-lg shadow.md">
                                    RX
                                </Badge>
                            )}
                        </div>
                    }

                    {wod.duration && (
                        <div className="flex items-center gap-1.5 text-muted-foreground mt-2">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm font-medium">{wod.duration} min</span>
                        </div>
                    )}
                </>
            }
            content={
                <>
                    {wod.workoutExercises && 
                        <ul className="space-y-2">
                            {wod.workoutExercises.map((ex) => (
                                <li key={ex.id}>
                                    <WorkoutExerciseCard exerciseWithDetails={ex} />
                                </li>
                            ))}
                        </ul>
                    }
                </>
            }
            footer={
                <>
                    {(wod.date || (wod.workoutExercises && wod.workoutExercises.length)) && 
                        <div className="flex items-center justify-between pt-4 w-full border-t border-border">
                            { wod.date && 
                                <div className="flex items-center gap--2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs ml-2 font-semibold uppercase tracking-wide">
                                        {wod.date?.toLocaleDateString()}
                                    </span>
                                </div>
                            }
                            { wod.workoutExercises && wod.workoutExercises.length > 0 && 
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-medium">{wod.workoutExercises.length}</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">exercises</span>
                                </div>
                            }
                        </div>
                    }
                </>
            }
        >
        </WodCardLayout>
    )
}
export default WodCard
