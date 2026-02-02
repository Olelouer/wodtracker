import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import WodCard from '@/components/cards/WodCard';
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
                <WodCard key={wod.id} wod={wod} />
            ))}
        </div>
    )
}

export default WodListCpn;