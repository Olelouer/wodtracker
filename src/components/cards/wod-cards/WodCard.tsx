import Link from 'next/link';
import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Timer, Zap, Pencil } from 'lucide-react';
import { WorkoutWithExercises } from '@/db/schema';
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
                    <div className="flex items-center justify-between pt-4 w-full border-t border-border gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                            {wod.date && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wide">
                                        {wod.date.toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                            {wod.workoutExercises && wod.workoutExercises.length > 0 && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span className="font-medium">{wod.workoutExercises.length}</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">exercises</span>
                                </div>
                            )}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/wod/${wod.id}/edit`} className="gap-1.5">
                                <Pencil className="w-3.5 h-3.5" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </>
            }
        >
        </WodCardLayout>
    )
}
export default WodCard
