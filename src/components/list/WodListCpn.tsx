import {Card, CardTitle, CardHeader, CardContent} from '@/components/ui/card';
import {WorkoutWithExercises} from '@/db/schema';

const WodListCpn = ({ wods }: { wods: WorkoutWithExercises[] })=> {
    return (
        <ul className="list-none space-y-4">
            {wods.map((wod:WorkoutWithExercises) => (
                <Card key={wod.id}>
                    <CardHeader>
                        <CardTitle>{wod.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {wod.workoutExercises.map((ex) => (
                            <p key={ex.id}>{ex.exercise.name}</p>
                        ))}
                        <p>{wod.date}</p>
                    </CardContent>
                </Card>
            ))}
        </ul>
    )
}

export default WodListCpn;