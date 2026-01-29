import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkoutWithExercises } from '@/db/schema';
import { Dumbbell, Calendar, Flame, Weight } from 'lucide-react';

const WodListCpn = ({ wods }: { wods: WorkoutWithExercises[] }) => {
    if (wods.length === 0) {
        return (
            <div className="flex justify-center w-full flex-col">
                <div className="flex justify-center items-center pt-10 pb-5">
                    <Flame className="text-orange-500 mr-2"/>
                    <p className="text-center text-xl">Aucun WOD enregistré. Au travail !</p>
                </div>
                <div className="flex justify-center items-center">
                    <Button>
                        <Link href="/wod-creator" className="text-lg font-semibold">Créer mon premier WOD !</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wods.map((wod) => (
                <Card key={wod.id} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                    <CardHeader className="bg-muted/30 pb-3">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-2xl font-black uppercase tracking-tighter">
                                {wod.title || "WOD"}
                            </CardTitle>
                            {wod.isRx && (
                                <Badge variant="secondary" className="font-bold bg-black text-white">RX</Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="pt-5 space-y-4">
                        <div className="space-y-3">
                            {wod.workoutExercises.map((ex) => (
                                <div key={ex.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-primary/10 rounded-full text-primary">
                                            <Dumbbell className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold text-sm">{ex.exercise.name}</span>
                                    </div>

                                    <div className="flex gap-3 text-sm font-mono bg-muted px-2 py-1 rounded">
                                        <span className="flex items-center gap-1">
                                            <Flame className="w-3 h-3 text-orange-500" />
                                            {ex.reps ?? '--'}
                                        </span>
                                        <span className="flex items-center gap-1 border-l pl-2">
                                            <Weight className="w-3 h-3 text-red-500" />
                                            {ex.weight ? `${ex.weight}kg` : '--'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold pt-4 border-t">
                            <Calendar className="w-3 h-3" />
                            <span>{wod.date}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default WodListCpn;